import re
from typing import Optional
from models.procurement import QueryParseResult

def parse_procurement_query(query: str) -> QueryParseResult:
    """
    Parses unstructured text like:
    'I need 5,000 food containers, under ₹20,000, delivered within seven days'
    into structured procurement parameters.
    """
    text = query.strip()
    
    # 1. Extract Quantity
    # Looks for '5,000', '5000', '5k', '5000 pcs', '5000 units'
    qty = 5000
    qty_match = re.search(r'(\d+[\d,]*)\s*(?:pieces|pcs|units|containers|boxes|cups|bags|trays)?', text, re.IGNORECASE)
    k_match = re.search(r'(\d+(?:\.\d+)?)\s*k\b', text, re.IGNORECASE)
    
    if k_match:
        qty = int(float(k_match.group(1)) * 1000)
    elif qty_match:
        cleaned_num = qty_match.group(1).replace(",", "")
        if cleaned_num.isdigit() and int(cleaned_num) > 10:
            qty = int(cleaned_num)

    # 2. Extract Budget
    # Looks for 'under ₹20,000', 'under 20000', 'budget 20k', 'max 25000'
    budget = 20000.0
    budget_k = re.search(r'(?:under|below|within|budget|max|rs\.?|₹)\s*(\d+(?:\.\d+)?)\s*k\b', text, re.IGNORECASE)
    budget_match = re.search(r'(?:under|below|within|budget|max|rs\.?|₹)\s*₹?\s*(\d+[\d,]*)', text, re.IGNORECASE)
    
    if budget_k:
        budget = float(budget_k.group(1)) * 1000
    elif budget_match:
        cleaned_b = budget_match.group(1).replace(",", "")
        if cleaned_b.isdigit():
            budget = float(cleaned_b)

    # 3. Extract Delivery Days
    # Looks for 'seven days', '7 days', 'within 5 days', 'in a week'
    days = 7
    word_to_num = {
        "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, 
        "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10,
        "a week": 7, "two weeks": 14
    }
    
    days_match = re.search(r'(\d+)\s*(?:days|day|d)\b', text, re.IGNORECASE)
    if days_match:
        days = int(days_match.group(1))
    else:
        for word, num in word_to_num.items():
            if re.search(rf'\b{word}\s*(?:days)?\b', text, re.IGNORECASE):
                days = num
                break

    # 4. Extract Product / Category
    product_name = "Food Containers (750ml)"
    category = "Packaging & Containers"
    tags = []

    if re.search(r'food\s*container|meal\s*box|packaging\s*box', text, re.IGNORECASE):
        product_name = "Kraft Paper Food Containers (750ml)"
        category = "Packaging & Containers"
        tags.extend(["Food Grade", "Leakproof"])
    elif re.search(r'cup|coffee\s*cup|chai\s*cup', text, re.IGNORECASE):
        product_name = "Paper Cups with Lids (250ml)"
        category = "Disposable Drinkware"
        tags.extend(["Heat Resistant", "Ripple Wall"])
    elif re.search(r'tray|bagasse|biodegradable|meal\s*tray', text, re.IGNORECASE):
        product_name = "Biodegradable 3-Compartment Meal Trays"
        category = "Eco-Friendly Packaging"
        tags.extend(["100% Compostable", "Microwave Safe"])
    elif re.search(r'bag|delivery\s*bag|paper\s*bag', text, re.IGNORECASE):
        product_name = "Brown Kraft Paper Delivery Bags"
        category = "Packaging & Bags"
        tags.extend(["Heavy Duty", "Recyclable"])

    if "kraft" in text.lower():
        tags.append("Kraft Paper")
    if "bio" in text.lower() or "eco" in text.lower():
        tags.append("Eco-Friendly")

    return QueryParseResult(
        item_name=product_name,
        quantity=qty,
        max_budget=budget,
        delivery_days_limit=days,
        category=category,
        extracted_tags=list(set(tags))
    )
