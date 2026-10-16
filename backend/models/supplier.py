from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class TieredPrice(BaseModel):
    min_qty: int
    unit_price: float

class CostBreakdown(BaseModel):
    base_subtotal: float
    gst_percentage: float
    gst_amount: float
    shipping_cost: float
    handling_fee: float
    total_landed_cost: float
    effective_unit_cost: float

class SupplierContact(BaseModel):
    phone: Optional[str] = None
    email: Optional[str] = None
    location_city: str
    whatsapp_url: Optional[str] = None
    rfq_draft: Optional[str] = None

class SupplierOffer(BaseModel):
    id: str
    supplier_name: str
    source_domain: str
    source_url: str
    product_title: str
    product_image: Optional[str] = None
    base_unit_price: float
    moq: int
    tiered_pricing: List[TieredPrice] = []
    applicable_unit_price: float
    cost_breakdown: CostBreakdown
    estimated_delivery_days: int
    delivery_deadline_met: bool
    within_budget: bool
    savings_vs_budget: float
    savings_vs_market_avg: float
    supplier_rating: float
    review_count: int = 0
    verified_seller: bool = True
    food_grade_certified: bool = True
    biodegradable: bool = False
    composite_score: float = 0.0
    rank: int = 0
    recommendation_badge: Optional[str] = None
    verdict_reasoning: str
    evidence_snippet: str
    missing_or_risk_notes: List[str] = []
    contact: SupplierContact
