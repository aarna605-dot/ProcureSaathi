import time
from typing import Dict, Any, Optional
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from config import TINYFISH_API_KEY, BACKEND_HOST, BACKEND_PORT, get_tinyfish_api_key
from models.procurement import ProcurementRequest, ProcurementResponse, QueryParseResult
from services.nlp_parser import parse_procurement_query
from services.tinyfish_service import TinyFishService
from services.cost_engine import evaluate_and_rank_offers
from services.mock_suppliers import get_raw_supplier_pool
from services.rfq_service import generate_rfq_draft

app = FastAPI(
    title="ProcureSaathi API",
    description="Autonomous B2B Procurement Intelligence with TinyFish Web Research Agent",
    version="1.0.0"
)

# Enable CORS for frontend dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NaturalQueryRequest(BaseModel):
    query: str

class RecalculateRequest(BaseModel):
    quantity: int
    max_budget: float
    delivery_days_limit: int
    item_name: str = "Food Containers (750ml)"
    delivery_city: str = "New Delhi"
    category: str = "Packaging & Containers"

@app.get("/api/health")
async def health_check():
    key = get_tinyfish_api_key()
    return {
        "status": "healthy",
        "service": "ProcureSaathi API",
        "tinyfish_configured": bool(key),
        "timestamp": time.time()
    }

@app.post("/api/procure/parse-query", response_model=QueryParseResult)
async def parse_query_endpoint(req: NaturalQueryRequest):
    """
    Parses natural language requirements into structured procurement parameters.
    Example: 'I need 5,000 food containers, under ₹20,000, delivered within seven days.'
    """
    if not req.query.strip():
        raise HTTPException(status_code=400, detail="Query text cannot be empty.")
    return parse_procurement_query(req.query)

@app.post("/api/procure/search", response_model=ProcurementResponse)
async def search_and_evaluate(
    request: ProcurementRequest,
    x_tinyfish_key: Optional[str] = Header(None)
):
    """
    Full end-to-end procurement pipeline:
    1. Parse natural language (if provided)
    2. Deploy TinyFish web research agent to search and fetch supplier listings
    3. Calculate true total landed cost factoring GST and freight
    4. Rank offers and generate transparent decision rationale + WhatsApp RFQs
    """
    start_time = time.time()

    # Use header key if passed from client
    if x_tinyfish_key and not request.tinyfish_api_key:
        request.tinyfish_api_key = x_tinyfish_key

    # If user provided natural language prompt, enhance structured params
    if request.query_text and request.query_text.strip():
        parsed = parse_procurement_query(request.query_text)
        # Only override if user kept defaults
        if request.quantity == 5000:
            request.quantity = parsed.quantity
        if request.max_budget == 20000.0:
            request.max_budget = parsed.max_budget
        if request.delivery_days_limit == 7:
            request.delivery_days_limit = parsed.delivery_days_limit
        if request.item_name == "Food Containers (750ml)":
            request.item_name = parsed.item_name

    tinyfish = TinyFishService(api_key=request.tinyfish_api_key or "")
    raw_suppliers, telemetry, mode = await tinyfish.execute_procurement_research(request)
    
    evaluated_offers, benchmark = evaluate_and_rank_offers(raw_suppliers, request)
    best_id = evaluated_offers[0].id if evaluated_offers else None
    exec_time = round(time.time() - start_time, 2)

    return ProcurementResponse(
        success=True,
        request_summary={
            "item_name": request.item_name,
            "quantity": request.quantity,
            "max_budget": request.max_budget,
            "delivery_days_limit": request.delivery_days_limit,
            "delivery_city": request.delivery_city,
            "query_text": request.query_text
        },
        offers=evaluated_offers,
        best_recommendation_id=best_id,
        market_benchmark=benchmark,
        agent_telemetry=telemetry,
        execution_mode=mode,
        execution_time_seconds=exec_time,
        message=f"Successfully analyzed {len(evaluated_offers)} suppliers using {mode} mode."
    )

@app.post("/api/procure/recalculate")
async def recalculate_costs(req: RecalculateRequest):
    """
    Rapidly recalculates landed costs and rankings when user adjusts the quantity slider or budget.
    """
    mock_req = ProcurementRequest(
        item_name=req.item_name,
        quantity=req.quantity,
        max_budget=req.max_budget,
        delivery_days_limit=req.delivery_days_limit,
        delivery_city=req.delivery_city,
        category=req.category
    )
    raw_pool = get_raw_supplier_pool(req.category)
    evaluated_offers, benchmark = evaluate_and_rank_offers(raw_pool, mock_req)
    return {
        "offers": evaluated_offers,
        "market_benchmark": benchmark
    }

@app.get("/api/suppliers/catalog")
async def get_catalog():
    """Returns the full raw catalog of verified B2B suppliers."""
    return {"catalog": get_raw_supplier_pool()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=BACKEND_HOST, port=BACKEND_PORT, reload=True)
