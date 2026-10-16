from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from .supplier import SupplierOffer

class ProcurementRequest(BaseModel):
    query_text: Optional[str] = Field(None, description="Freeform user prompt, e.g. '5000 containers under 20000 in 7 days'")
    item_name: str = Field("Food Containers (750ml)", description="Name or specs of the product")
    quantity: int = Field(5000, ge=1, description="Required quantity")
    max_budget: float = Field(20000.0, ge=0, description="Max budget in INR")
    delivery_days_limit: int = Field(7, ge=1, description="Max delivery days allowed")
    category: str = Field("Packaging & Containers", description="Procurement category")
    delivery_city: str = Field("New Delhi", description="Delivery destination city")
    quality_requirements: List[str] = Field(default_factory=lambda: ["Food Grade", "Leakproof"])
    tinyfish_api_key: Optional[str] = Field(None, description="Optional custom TinyFish API key override")
    force_live_agent: bool = Field(False, description="Whether to strictly query live TinyFish agent endpoints")

class QueryParseResult(BaseModel):
    item_name: str
    quantity: int
    max_budget: float
    delivery_days_limit: int
    category: str
    extracted_tags: List[str] = []

class AgentLogStep(BaseModel):
    step_number: int
    title: str
    detail: str
    status: str = "completed"  # pending, running, completed, warning, error
    timestamp: str
    metadata: Dict[str, Any] = {}

class ProcurementResponse(BaseModel):
    success: bool = True
    request_summary: Dict[str, Any]
    offers: List[SupplierOffer]
    best_recommendation_id: Optional[str] = None
    market_benchmark: Dict[str, Any]
    agent_telemetry: List[AgentLogStep]
    execution_mode: str  # "tinyfish_live", "tinyfish_hybrid", "curated_simulation"
    execution_time_seconds: float
    message: str = "Success"
