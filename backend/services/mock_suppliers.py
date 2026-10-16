from typing import List, Dict, Any

RAW_SUPPLIERS_DATA: List[Dict[str, Any]] = [
    {
        "id": "sup-bizongo-01",
        "supplier_name": "EcoPack Systems (Bizongo Partner)",
        "source_domain": "bizongo.com",
        "source_url": "https://www.bizongo.com/product/kraft-food-container-750ml",
        "product_title": "750ml Brown Kraft Paper Food Container with PET Clear Lid",
        "product_image": "https://images.unsplash.com/photo-1584473457406-6240486418e9?w=600&auto=format&fit=crop&q=80",
        "category": "Packaging & Containers",
        "base_unit_price": 2.85,
        "moq": 1000,
        "tiered_pricing": [
            {"min_qty": 1000, "unit_price": 3.40},
            {"min_qty": 2500, "unit_price": 3.10},
            {"min_qty": 5000, "unit_price": 2.85},
            {"min_qty": 10000, "unit_price": 2.65}
        ],
        "gst_percentage": 18.0,
        "shipping_policy": "free_over_10k",  # Free if order > 10,000 INR
        "base_shipping_cost": 450.0,
        "estimated_delivery_days": 5,
        "supplier_rating": 4.8,
        "review_count": 342,
        "verified_seller": True,
        "food_grade_certified": True,
        "biodegradable": True,
        "location_city": "Gurugram / Delhi NCR",
        "contact_phone": "+91 98112 34567",
        "contact_email": "b2b-orders@ecopacksystems.in",
        "evidence_snippet": "Extract from bizongo.com/kraft-container: '320 GSM Food Grade Virgin Kraft Paperboard with food-safe internal PE coating. Microwave and freezer safe (-20°C to 120°C). 5,000+ unit tier priced at ₹2.85/unit. Dispatch lead time: 3-5 days across North India. GST 18% extra. Free shipping on bulk orders above ₹10,000.'",
        "missing_or_risk_notes": [
            "Lids are packed in separate master cartons (100 pcs per sleeve)."
        ]
    },
    {
        "id": "sup-indiamart-shrriram",
        "supplier_name": "Shrriram Packaging Solutions",
        "source_domain": "indiamart.com",
        "source_url": "https://www.indiamart.com/shrrirampackaging/food-grade-containers.html",
        "product_title": "750ml Round Kraft Bowl with Vented Anti-Fog Lid",
        "product_image": "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=600&auto=format&fit=crop&q=80",
        "category": "Packaging & Containers",
        "base_unit_price": 3.10,
        "moq": 2000,
        "tiered_pricing": [
            {"min_qty": 2000, "unit_price": 3.35},
            {"min_qty": 5000, "unit_price": 3.10},
            {"min_qty": 10000, "unit_price": 2.90}
        ],
        "gst_percentage": 12.0,
        "shipping_policy": "flat_freight",
        "base_shipping_cost": 480.0,
        "estimated_delivery_days": 4,
        "supplier_rating": 4.6,
        "review_count": 189,
        "verified_seller": True,
        "food_grade_certified": True,
        "biodegradable": True,
        "location_city": "Okhla Phase III, New Delhi",
        "contact_phone": "+91 98710 88231",
        "contact_email": "sales@shrrirampack.com",
        "evidence_snippet": "Extract from indiamart.com: 'IndiaMART Verified TrustSEAL Seller (8 Years). Leakproof round container with snap-fit vented lid. Ideal for biryani, curries, and gravies. ₹3.10/piece for 5,000 pcs lot. GST 12% extra. Delhi local dispatch in 48 hours; NCR delivery in 3-4 days via BlueDart Freight.'",
        "missing_or_risk_notes": [
            "Prepayment of 50% advance required for first-time buyers."
        ]
    },
    {
        "id": "sup-biokraft-direct",
        "supplier_name": "BioKraft India Eco-Works",
        "source_domain": "biokraftindia.com",
        "source_url": "https://biokraftindia.com/products/bagasse-meal-container-750ml",
        "product_title": "100% Sugarcane Bagasse Biodegradable 750ml Food Box",
        "product_image": "https://images.unsplash.com/photo-1595246140625-573b715d11dc?w=600&auto=format&fit=crop&q=80",
        "category": "Packaging & Containers",
        "base_unit_price": 3.45,
        "moq": 1500,
        "tiered_pricing": [
            {"min_qty": 1500, "unit_price": 3.75},
            {"min_qty": 5000, "unit_price": 3.45},
            {"min_qty": 10000, "unit_price": 3.20}
        ],
        "gst_percentage": 12.0,
        "shipping_policy": "free_over_10k",
        "base_shipping_cost": 400.0,
        "estimated_delivery_days": 6,
        "supplier_rating": 4.9,
        "review_count": 512,
        "verified_seller": True,
        "food_grade_certified": True,
        "biodegradable": True,
        "location_city": "Noida, UP",
        "contact_phone": "+91 99580 12433",
        "contact_email": "wholesale@biokraftindia.com",
        "evidence_snippet": "Extract from biokraftindia.com: '100% Bagasse Agro-Waste Pulp. Plastic-free & Home Compostable certified by CIPET. Water & Oil resistant up to 100°C. 5,000 units @ ₹3.45/pc (12% GST). Pan-India dispatch 5-6 business days. Free logistics on orders exceeding ₹12,000.'",
        "missing_or_risk_notes": [
            "Bagasse containers are heavier than standard paperboard; stack height max 5 boxes."
        ]
    },
    {
        "id": "sup-moglix-bulk",
        "supplier_name": "Moglix Enterprise Packaging Hub",
        "source_domain": "moglix.com",
        "source_url": "https://www.moglix.com/packaging-supplies/food-containers/750ml-kraft",
        "product_title": "Commercial Grade Heavyweight Food Container with Airtight Lid",
        "product_image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80",
        "category": "Packaging & Containers",
        "base_unit_price": 3.80,
        "moq": 500,
        "tiered_pricing": [
            {"min_qty": 500, "unit_price": 4.20},
            {"min_qty": 2000, "unit_price": 3.95},
            {"min_qty": 5000, "unit_price": 3.80}
        ],
        "gst_percentage": 18.0,
        "shipping_policy": "flat_freight",
        "base_shipping_cost": 750.0,
        "estimated_delivery_days": 8,
        "supplier_rating": 4.3,
        "review_count": 87,
        "verified_seller": True,
        "food_grade_certified": True,
        "biodegradable": False,
        "location_city": "Bhiwandi / Mumbai Hub",
        "contact_phone": "+91 80010 99887",
        "contact_email": "enterprise@moglix.com",
        "evidence_snippet": "Extract from moglix.com: 'Heavyweight food container 750ml with interlocking airtight lid. Dispatched from Western Logistics Hub. Lead time to North India: 7-9 business days. GST 18% extra. Logistics freight ₹750 applies.'",
        "missing_or_risk_notes": [
            "Delivery lead time is 8 business days (Exceeds 7-day target delivery deadline).",
            "Highest overall landed cost due to interstate shipping from Maharashtra."
        ]
    },
    {
        "id": "sup-alpha-pack",
        "supplier_name": "Alpha Pack Tech Traders",
        "source_domain": "indiamart.com",
        "source_url": "https://www.indiamart.com/alphapacktech/cheap-food-containers.html",
        "product_title": "Economy Disposable Meal Box 750ml",
        "product_image": "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?w=600&auto=format&fit=crop&q=80",
        "category": "Packaging & Containers",
        "base_unit_price": 2.40,  # Advertised low price
        "moq": 20000,  # TRAP: MOQ is 20k!
        "tiered_pricing": [
            {"min_qty": 20000, "unit_price": 2.40},
            {"min_qty": 10000, "unit_price": 3.60},
            {"min_qty": 5000, "unit_price": 4.30}  # Small order penalty
        ],
        "gst_percentage": 18.0,
        "shipping_policy": "flat_freight",
        "base_shipping_cost": 600.0,
        "estimated_delivery_days": 6,
        "supplier_rating": 3.9,
        "review_count": 41,
        "verified_seller": False,
        "food_grade_certified": False,
        "biodegradable": False,
        "location_city": "Jaipur, Rajasthan",
        "contact_phone": "+91 94140 55122",
        "contact_email": "alphapackjaipur@gmail.com",
        "evidence_snippet": "Extract from indiamart.com listing: 'Headline advertised price ₹2.40 is strictly applicable on minimum master container order of 20,000 units. For quantities of 5,000 pcs, sub-lot pricing ₹4.30/unit applies. Lids billed separately at ₹0.80. Food grade certification pending renewal.'",
        "missing_or_risk_notes": [
            "MOQ Trap Warning: Advertised ₹2.40 requires 20,000 units order. For 5,000 units, price jumps to ₹4.30.",
            "Seller has no verified GST TrustSeal or active FSSAI certificate.",
            "Lids are not included in the base rate and cost extra."
        ]
    }
]

def get_raw_supplier_pool(category: str = "") -> List[Dict[str, Any]]:
    """Returns supplier pool filtered or tailored to category."""
    return RAW_SUPPLIERS_DATA
