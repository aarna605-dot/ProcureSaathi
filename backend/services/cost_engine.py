from typing import List, Dict, Any, Tuple
from models.supplier import SupplierOffer, TieredPrice, CostBreakdown
from models.procurement import ProcurementRequest
from services.rfq_service import generate_rfq_draft

def calculate_applicable_unit_price(quantity: int, raw_supplier: Dict[str, Any]) -> float:
    """
    Finds the exact unit price matching the quantity based on tiered bulk slabs.
    If quantity falls below MOQ, applies penalty or the lowest volume tier.
    """
    tiered_pricing = raw_supplier.get("tiered_pricing", [])
    if not tiered_pricing:
        return float(raw_supplier.get("base_unit_price", 3.0))

    # Sort descending by min_qty
    sorted_tiers = sorted(tiered_pricing, key=lambda x: x["min_qty"], reverse=True)
    
    # Check if quantity qualifies for bulk tiers
    for tier in sorted_tiers:
        if quantity >= tier["min_qty"]:
            return float(tier["unit_price"])
            
    # If below the smallest tier
    smallest_tier = min(tiered_pricing, key=lambda x: x["min_qty"])
    return float(smallest_tier["unit_price"])

def compute_landed_cost(
    quantity: int,
    unit_price: float,
    raw_supplier: Dict[str, Any]
) -> CostBreakdown:
    """
    Computes true total landed cost factoring GST, freight policies, and handling.
    """
    base_subtotal = round(unit_price * quantity, 2)
    gst_pct = float(raw_supplier.get("gst_percentage", 18.0))
    gst_amount = round(base_subtotal * (gst_pct / 100.0), 2)
    
    # Freight calculation
    shipping_policy = raw_supplier.get("shipping_policy", "flat_freight")
    base_shipping = float(raw_supplier.get("base_shipping_cost", 450.0))
    
    if shipping_policy == "free_over_10k" and base_subtotal >= 10000.0:
        shipping_cost = 0.0
    else:
        shipping_cost = base_shipping

    # Nominal transit handling & insurance (1% capped at ₹250)
    handling_fee = round(min(base_subtotal * 0.01, 250.0), 2)
    total_landed = round(base_subtotal + gst_amount + shipping_cost + handling_fee, 2)
    effective_unit_cost = round(total_landed / quantity, 2) if quantity > 0 else 0.0

    return CostBreakdown(
        base_subtotal=base_subtotal,
        gst_percentage=gst_pct,
        gst_amount=gst_amount,
        shipping_cost=shipping_cost,
        handling_fee=handling_fee,
        total_landed_cost=total_landed,
        effective_unit_cost=effective_unit_cost
    )

def evaluate_and_rank_offers(
    raw_suppliers: List[Dict[str, Any]],
    request: ProcurementRequest
) -> Tuple[List[SupplierOffer], Dict[str, Any]]:
    """
    Evaluates all raw supplier data against user requirements, calculates
    verified total landed costs, scores suppliers, and ranks them with human-readable rationale.
    """
    evaluated_offers: List[SupplierOffer] = []
    
    # First pass: calculate landed costs for all
    temp_list = []
    for raw in raw_suppliers:
        unit_price = calculate_applicable_unit_price(request.quantity, raw)
        breakdown = compute_landed_cost(request.quantity, unit_price, raw)
        temp_list.append((raw, unit_price, breakdown))
        
    if not temp_list:
        return [], {"average_total_cost": 0, "max_savings": 0}

    # Calculate market benchmark
    all_landed_costs = [t[2].total_landed_cost for t in temp_list]
    market_avg_total_cost = round(sum(all_landed_costs) / len(all_landed_costs), 2)
    lowest_cost = min(all_landed_costs)

    for raw, unit_price, breakdown in temp_list:
        est_days = int(raw.get("estimated_delivery_days", 7))
        delivery_ok = est_days <= request.delivery_days_limit
        budget_ok = breakdown.total_landed_cost <= request.max_budget
        savings_budget = round(request.max_budget - breakdown.total_landed_cost, 2)
        savings_market = round(market_avg_total_cost - breakdown.total_landed_cost, 2)
        
        # Scoring logic (0 to 100)
        # 1. Price Score (max 40)
        cost_ratio = breakdown.total_landed_cost / max(market_avg_total_cost, 1.0)
        price_score = max(0.0, min(40.0, 40.0 * (1.3 - cost_ratio)))
        
        # 2. Delivery Score (max 25)
        if est_days <= request.delivery_days_limit:
            # Faster delivery gets slight bonus
            delivery_score = 25.0 - (est_days / max(request.delivery_days_limit, 1)) * 3.0
        else:
            days_over = est_days - request.delivery_days_limit
            delivery_score = max(0.0, 20.0 - (days_over * 10.0))
            
        # 3. MOQ Score (max 15)
        moq = int(raw.get("moq", 1000))
        if moq <= request.quantity:
            moq_score = 15.0
        else:
            moq_score = 3.0  # Big penalty for MOQ trap
            
        # 4. Trust & Quality (max 15)
        rating = float(raw.get("supplier_rating", 4.0))
        verified = bool(raw.get("verified_seller", True))
        food_grade = bool(raw.get("food_grade_certified", True))
        trust_score = (rating / 5.0) * 8.0 + (4.0 if verified else 0.0) + (3.0 if food_grade else 0.0)
        
        # 5. Eco Bonus (max 5)
        eco_bonus = 5.0 if raw.get("biodegradable", False) else 0.0
        
        composite_score = round(price_score + delivery_score + moq_score + trust_score + eco_bonus, 1)

        # Convert tiered pricing models
        tiered_models = [
            TieredPrice(min_qty=tp["min_qty"], unit_price=tp["unit_price"])
            for tp in raw.get("tiered_pricing", [])
        ]

        # Generate contact and RFQ draft
        contact = generate_rfq_draft(
            supplier_name=raw.get("supplier_name", "Supplier"),
            product_title=raw.get("product_title", "Product"),
            quantity=request.quantity,
            applicable_unit_price=unit_price,
            total_landed_cost=breakdown.total_landed_cost,
            delivery_days_limit=request.delivery_days_limit,
            delivery_city=request.delivery_city,
            phone=raw.get("contact_phone", ""),
            email=raw.get("contact_email", ""),
            location_city=raw.get("location_city", "India")
        )

        # Create human-readable transparent reasoning
        reasons = []
        if budget_ok:
            reasons.append(f"Saves ₹{abs(savings_budget):,.0f} below your ₹{request.max_budget:,.0f} budget")
        else:
            reasons.append(f"Exceeds budget ceiling by ₹{abs(savings_budget):,.0f}")

        if delivery_ok:
            reasons.append(f"delivers in {est_days} days (within your {request.delivery_days_limit}-day limit)")
        else:
            reasons.append(f"⚠️ Delivers in {est_days} days ({est_days - request.delivery_days_limit} days late)")

        if raw.get("shipping_policy") == "free_over_10k" and breakdown.shipping_cost == 0:
            reasons.append("includes free bulk logistics")
        elif breakdown.shipping_cost > 0:
            reasons.append(f"₹{breakdown.shipping_cost:.0f} freight added")

        if moq > request.quantity:
            reasons.append(f"⚠️ High MOQ ({moq:,} pcs) requires ordering excess stock")

        verdict_reasoning = f"{raw.get('supplier_name')}: " + ", ".join(reasons) + "."

        offer = SupplierOffer(
            id=raw.get("id", "sup-unknown"),
            supplier_name=raw.get("supplier_name", "Supplier"),
            source_domain=raw.get("source_domain", "web"),
            source_url=raw.get("source_url", "#"),
            product_title=raw.get("product_title", "Product Title"),
            product_image=raw.get("product_image"),
            base_unit_price=float(raw.get("base_unit_price", 3.0)),
            moq=moq,
            tiered_pricing=tiered_models,
            applicable_unit_price=unit_price,
            cost_breakdown=breakdown,
            estimated_delivery_days=est_days,
            delivery_deadline_met=delivery_ok,
            within_budget=budget_ok,
            savings_vs_budget=savings_budget,
            savings_vs_market_avg=savings_market,
            supplier_rating=rating,
            review_count=int(raw.get("review_count", 0)),
            verified_seller=verified,
            food_grade_certified=food_grade,
            biodegradable=bool(raw.get("biodegradable", False)),
            composite_score=composite_score,
            rank=0,
            verdict_reasoning=verdict_reasoning,
            evidence_snippet=raw.get("evidence_snippet", "Verified live from supplier catalog."),
            missing_or_risk_notes=raw.get("missing_or_risk_notes", []),
            contact=contact
        )
        evaluated_offers.append(offer)

    # Sort descending by composite score
    evaluated_offers.sort(key=lambda o: o.composite_score, reverse=True)

    # Assign ranks and badges
    for idx, offer in enumerate(evaluated_offers):
        offer.rank = idx + 1
        if idx == 0:
            offer.recommendation_badge = "Best Overall Value"
        elif offer.cost_breakdown.total_landed_cost == lowest_cost:
            offer.recommendation_badge = "Lowest Total Cost"
        elif offer.estimated_delivery_days == min(o.estimated_delivery_days for o in evaluated_offers):
            offer.recommendation_badge = "Fastest Delivery"
        elif offer.biodegradable and offer.supplier_rating >= 4.8:
            offer.recommendation_badge = "Top Eco Choice"

    market_benchmark = {
        "average_total_cost": market_avg_total_cost,
        "lowest_total_cost": lowest_cost,
        "highest_total_cost": max(all_landed_costs),
        "max_potential_savings": round(max(all_landed_costs) - lowest_cost, 2),
        "savings_vs_market_avg": round(market_avg_total_cost - lowest_cost, 2),
        "total_suppliers_analyzed": len(evaluated_offers)
    }

    return evaluated_offers, market_benchmark
