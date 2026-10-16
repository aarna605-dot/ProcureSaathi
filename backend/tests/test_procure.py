import pytest
from fastapi.testclient import TestClient
from main import app
from services.nlp_parser import parse_procurement_query
from services.cost_engine import evaluate_and_rank_offers, compute_landed_cost
from services.mock_suppliers import get_raw_supplier_pool
from models.procurement import ProcurementRequest

client = TestClient(app)

def test_nlp_parser_hackathon_query():
    query = "I need 5,000 food containers, under ₹20,000, delivered within seven days."
    res = parse_procurement_query(query)
    assert res.quantity == 5000
    assert res.max_budget == 20000.0
    assert res.delivery_days_limit == 7
    assert "Food Containers" in res.item_name

def test_landed_cost_calculation():
    req = ProcurementRequest(
        quantity=5000,
        max_budget=20000.0,
        delivery_days_limit=7
    )
    suppliers = get_raw_supplier_pool()
    offers, benchmark = evaluate_and_rank_offers(suppliers, req)
    
    assert len(offers) == 5
    # Best offer should be EcoPack or Shrriram within budget
    top_offer = offers[0]
    assert top_offer.within_budget is True
    assert top_offer.cost_breakdown.total_landed_cost < 20000.0
    assert top_offer.cost_breakdown.gst_amount > 0
    assert benchmark["max_potential_savings"] > 5000.0

def test_moq_trap_flagged():
    req = ProcurementRequest(
        quantity=5000,
        max_budget=20000.0,
        delivery_days_limit=7
    )
    suppliers = get_raw_supplier_pool()
    offers, _ = evaluate_and_rank_offers(suppliers, req)
    
    # Alpha Pack has MOQ 20,000; for 5,000 it must be penalized or have low rank
    alpha_offer = next(o for o in offers if o.id == "sup-alpha-pack")
    assert alpha_offer.moq == 20000
    assert alpha_offer.rank > 2
    assert any("MOQ" in note for note in alpha_offer.missing_or_risk_notes)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_search_endpoint():
    payload = {
        "query_text": "I need 5,000 food containers, under ₹20,000, delivered within seven days.",
        "quantity": 5000,
        "max_budget": 20000.0,
        "delivery_days_limit": 7
    }
    response = client.post("/api/procure/search", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert len(data["offers"]) >= 5
    assert len(data["agent_telemetry"]) >= 5
