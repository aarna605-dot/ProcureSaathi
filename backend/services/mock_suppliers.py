from typing import List, Dict, Any, Optional

PACKAGING_SUPPLIERS: List[Dict[str, Any]] = [
    {
        "id": "sup-bizongo-01",
        "supplier_name": "EcoPack Systems (Bizongo Partner)",
        "source_domain": "bizongo.com",
        "source_url": "https://www.bizongo.com/product/kraft-food-container-750ml",
        "product_title": "750ml Brown Kraft Paper Food Container with PET Clear Lid",
        "product_image": "https://images.unsplash.com/photo-1578496781985-452d4a934d50?w=600&auto=format&fit=crop&q=80",
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
        "product_image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
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
        "product_image": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=600&auto=format&fit=crop&q=80",
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
        "product_image": "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80",
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
            "Delivery lead time is 8 business days (Exceeds target delivery deadline).",
            "Highest overall landed cost due to interstate shipping from Maharashtra."
        ]
    },
    {
        "id": "sup-alpha-pack",
        "supplier_name": "Alpha Pack Tech Traders",
        "source_domain": "indiamart.com",
        "source_url": "https://www.indiamart.com/alphapacktech/cheap-food-containers.html",
        "product_title": "Economy Disposable Meal Box 750ml",
        "product_image": "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80",
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

BRASS_SUPPLIERS: List[Dict[str, Any]] = [
    {
        "id": "sup-moradabad-brass-01",
        "supplier_name": "Moradabad Brass Works (Export Guild)",
        "source_domain": "indiamart.com",
        "source_url": "https://www.indiamart.com/moradabadbrassworks/artisan-hardware.html",
        "product_title": "Solid Brass Cabinet Castings & Door Pull Hardware",
        "product_image": "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=600&auto=format&fit=crop&q=80",
        "category": "Artisan Handicraft & Brass",
        "base_unit_price": 10.50,
        "moq": 500,
        "tiered_pricing": [
            {"min_qty": 500, "unit_price": 12.00},
            {"min_qty": 1000, "unit_price": 11.20},
            {"min_qty": 2000, "unit_price": 10.50},
            {"min_qty": 5000, "unit_price": 9.80}
        ],
        "gst_percentage": 12.0,
        "shipping_policy": "free_over_10k",
        "base_shipping_cost": 550.0,
        "estimated_delivery_days": 4,
        "supplier_rating": 4.9,
        "review_count": 218,
        "verified_seller": True,
        "food_grade_certified": False,
        "biodegradable": False,
        "location_city": "Moradabad Brass Hub, UP",
        "contact_phone": "+91 98370 11223",
        "contact_email": "export@moradabadbrass.in",
        "evidence_snippet": "Extract from indiamart.com: 'Moradabad Master Artisan Guild certified. Pure virgin brass sand casting with anti-tarnish lacquer finish. ₹10.50/pc at 2,000 units volume. Delivery in 4 business days to Delhi NCR.'",
        "missing_or_risk_notes": [
            "Mounting brass screws are bundled per 50 units carton."
        ]
    },
    {
        "id": "sup-aligarh-hardware",
        "supplier_name": "Aligarh Artisan Metalcraft Co.",
        "source_domain": "tradeindia.com",
        "source_url": "https://www.tradeindia.com/aligarh-metalcraft/antique-brass-pulls.html",
        "product_title": "Hand-Forged Antique Brass Handles & Architectural Latches",
        "product_image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&auto=format&fit=crop&q=80",
        "category": "Artisan Handicraft & Brass",
        "base_unit_price": 11.25,
        "moq": 1000,
        "tiered_pricing": [
            {"min_qty": 1000, "unit_price": 12.50},
            {"min_qty": 2000, "unit_price": 11.25},
            {"min_qty": 5000, "unit_price": 10.20}
        ],
        "gst_percentage": 18.0,
        "shipping_policy": "flat_freight",
        "base_shipping_cost": 420.0,
        "estimated_delivery_days": 5,
        "supplier_rating": 4.7,
        "review_count": 145,
        "verified_seller": True,
        "food_grade_certified": False,
        "biodegradable": False,
        "location_city": "Aligarh Industrial Area, UP",
        "contact_phone": "+91 97580 44321",
        "contact_email": "sales@aligarhmetalcraft.com",
        "evidence_snippet": "Extract from tradeindia.com: 'Aligarh ISO 9001 certified manufacturer. Precision CNC finished brass fittings. GST 18% extra. Express courier dispatch in 4-5 days.'",
        "missing_or_risk_notes": [
            "18% GST applies to non-agricultural architectural hardware."
        ]
    },
    {
        "id": "sup-royal-heritage-brass",
        "supplier_name": "Royal Heritage Brass Castings",
        "source_domain": "moglix.com",
        "source_url": "https://www.moglix.com/hardware/brass-castings-bulk",
        "product_title": "Heavy Duty Solid Brass Architectural Fittings",
        "product_image": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
        "category": "Artisan Handicraft & Brass",
        "base_unit_price": 13.00,
        "moq": 500,
        "tiered_pricing": [
            {"min_qty": 500, "unit_price": 14.20},
            {"min_qty": 2000, "unit_price": 13.00}
        ],
        "gst_percentage": 18.0,
        "shipping_policy": "free_over_10k",
        "base_shipping_cost": 600.0,
        "estimated_delivery_days": 7,
        "supplier_rating": 4.4,
        "review_count": 62,
        "verified_seller": True,
        "food_grade_certified": False,
        "biodegradable": False,
        "location_city": "Delhi NCR Metal Hub",
        "contact_phone": "+91 98100 88776",
        "contact_email": "orders@royalheritagebrass.in",
        "evidence_snippet": "Extract from moglix.com: 'Industrial-strength brass casting batch. 7-day dispatch warranty. Free freight above ₹15,000 order total.'",
        "missing_or_risk_notes": [
            "Longer lead time: 7 days due to finishing and inspection."
        ]
    }
]

TEXTILE_SUPPLIERS: List[Dict[str, Any]] = [
    {
        "id": "sup-surat-canvas",
        "supplier_name": "Surat Loomex Textiles Ltd.",
        "source_domain": "indiamart.com",
        "source_url": "https://www.indiamart.com/suratloomex/cotton-canvas-bales.html",
        "product_title": "Unbleached Heavyweight Raw Cotton Canvas Bales (10oz)",
        "product_image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
        "category": "Textiles & Cotton Canvas",
        "base_unit_price": 11.20,
        "moq": 500,
        "tiered_pricing": [
            {"min_qty": 500, "unit_price": 12.80},
            {"min_qty": 1500, "unit_price": 11.20},
            {"min_qty": 3000, "unit_price": 10.40}
        ],
        "gst_percentage": 5.0,  # 5% GST for textiles
        "shipping_policy": "free_over_10k",
        "base_shipping_cost": 500.0,
        "estimated_delivery_days": 4,
        "supplier_rating": 4.8,
        "review_count": 310,
        "verified_seller": True,
        "food_grade_certified": False,
        "biodegradable": True,
        "location_city": "Surat Textile Market, Gujarat",
        "contact_phone": "+91 98250 11998",
        "contact_email": "sales@suratloomex.com",
        "evidence_snippet": "Extract from indiamart.com: '100% Ring Spun Natural Cotton. Pre-shrunk 10oz canvas. 5% GST textile tier. Free freight on orders over ₹10k.'",
        "missing_or_risk_notes": []
    },
    {
        "id": "sup-texindia-organic",
        "supplier_name": "TexIndia Organic Mills",
        "source_domain": "bizongo.com",
        "source_url": "https://www.bizongo.com/textiles/organic-cotton-canvas",
        "product_title": "100% GOTS Certified Natural Canvas Fabric Rolls",
        "product_image": "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&auto=format&fit=crop&q=80",
        "category": "Textiles & Cotton Canvas",
        "base_unit_price": 12.50,
        "moq": 1000,
        "tiered_pricing": [
            {"min_qty": 1000, "unit_price": 13.50},
            {"min_qty": 1500, "unit_price": 12.50}
        ],
        "gst_percentage": 5.0,
        "shipping_policy": "flat_freight",
        "base_shipping_cost": 380.0,
        "estimated_delivery_days": 5,
        "supplier_rating": 4.9,
        "review_count": 174,
        "verified_seller": True,
        "food_grade_certified": False,
        "biodegradable": True,
        "location_city": "Coimbatore / Tiruppur Hub",
        "contact_phone": "+91 94430 77654",
        "contact_email": "b2b@texindiaorganic.in",
        "evidence_snippet": "Extract from bizongo.com: 'Certified Eco Organic Cotton Canvas roll. Zero chemical bleaching. Lead time: 5 days nationwide.'",
        "missing_or_risk_notes": []
    }
]

WOOD_SUPPLIERS: List[Dict[str, Any]] = [
    {
        "id": "sup-saharanpur-wood",
        "supplier_name": "Saharanpur Artisan Carving Guild",
        "source_domain": "indiamart.com",
        "source_url": "https://www.indiamart.com/saharanpurwood/sheesham-blanks.html",
        "product_title": "Kiln-Dried Seasoned Sheesham Wood Carving Blocks (4\"x4\"x8\")",
        "product_image": "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&auto=format&fit=crop&q=80",
        "category": "Woodcraft & Timber Blanks",
        "base_unit_price": 19.50,
        "moq": 500,
        "tiered_pricing": [
            {"min_qty": 500, "unit_price": 22.00},
            {"min_qty": 1000, "unit_price": 19.50},
            {"min_qty": 2500, "unit_price": 17.80}
        ],
        "gst_percentage": 18.0,
        "shipping_policy": "free_over_10k",
        "base_shipping_cost": 650.0,
        "estimated_delivery_days": 5,
        "supplier_rating": 4.8,
        "review_count": 192,
        "verified_seller": True,
        "food_grade_certified": False,
        "biodegradable": True,
        "location_city": "Saharanpur Woodcraft Hub, UP",
        "contact_phone": "+91 98371 99221",
        "contact_email": "guild@saharanpurwood.in",
        "evidence_snippet": "Extract from indiamart.com: 'Kiln-dried to under 10% moisture content. Defect-free premium heartwood Sheesham. Certified legal timber source.'",
        "missing_or_risk_notes": []
    },
    {
        "id": "sup-marwar-timber",
        "supplier_name": "Marwar Timber & Crafts",
        "source_domain": "tradeindia.com",
        "source_url": "https://www.tradeindia.com/marwartimber/sheesham-timber-blanks.html",
        "product_title": "Planed Indian Rosewood & Sheesham Turning Blanks",
        "product_image": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop&q=80",
        "category": "Woodcraft & Timber Blanks",
        "base_unit_price": 21.00,
        "moq": 500,
        "tiered_pricing": [
            {"min_qty": 500, "unit_price": 23.50},
            {"min_qty": 1000, "unit_price": 21.00}
        ],
        "gst_percentage": 18.0,
        "shipping_policy": "flat_freight",
        "base_shipping_cost": 500.0,
        "estimated_delivery_days": 6,
        "supplier_rating": 4.6,
        "review_count": 88,
        "verified_seller": True,
        "food_grade_certified": False,
        "biodegradable": True,
        "location_city": "Jodhpur Industrial Area, Rajasthan",
        "contact_phone": "+91 94141 33211",
        "contact_email": "sales@marwartimber.com",
        "evidence_snippet": "Extract from tradeindia.com: 'Seasoned desert Sheesham. Sanded smooth on 4 sides. Lead time: 6 days.'",
        "missing_or_risk_notes": []
    }
]

CERAMICS_SUPPLIERS: List[Dict[str, Any]] = [
    {
        "id": "sup-khurja-pottery",
        "supplier_name": "Khurja Ceramic Heritage Pottery",
        "source_domain": "indiamart.com",
        "source_url": "https://www.indiamart.com/khurjapottery/wholesale-mugs.html",
        "product_title": "Wholesale Matte Glazed Ceramic Mugs (350ml)",
        "product_image": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
        "category": "Drinkware & Ceramics",
        "base_unit_price": 14.50,
        "moq": 1000,
        "tiered_pricing": [
            {"min_qty": 1000, "unit_price": 16.00},
            {"min_qty": 2500, "unit_price": 14.50},
            {"min_qty": 5000, "unit_price": 13.20}
        ],
        "gst_percentage": 12.0,
        "shipping_policy": "free_over_10k",
        "base_shipping_cost": 450.0,
        "estimated_delivery_days": 5,
        "supplier_rating": 4.8,
        "review_count": 256,
        "verified_seller": True,
        "food_grade_certified": True,
        "biodegradable": False,
        "location_city": "Khurja Pottery Cluster, UP",
        "contact_phone": "+91 98375 66778",
        "contact_email": "orders@khurjapottery.com",
        "evidence_snippet": "Extract from indiamart.com: 'GI-tagged Khurja ceramics. Lead-free food grade glaze. Dishwasher safe. ₹14.50/unit for wholesale lots. Secure honeycomb carton packaging.'",
        "missing_or_risk_notes": [
            "Cushioned thermocol packaging included to prevent transit breakage."
        ]
    },
    {
        "id": "sup-clayvibe-tableware",
        "supplier_name": "ClayVibe Tableware Studio",
        "source_domain": "bizongo.com",
        "source_url": "https://www.bizongo.com/ceramic-drinkware/coffee-mugs",
        "product_title": "Stoneware Microwave-Safe Wholesale Coffee Mugs",
        "product_image": "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&auto=format&fit=crop&q=80",
        "category": "Drinkware & Ceramics",
        "base_unit_price": 15.80,
        "moq": 500,
        "tiered_pricing": [
            {"min_qty": 500, "unit_price": 17.50},
            {"min_qty": 2000, "unit_price": 15.80}
        ],
        "gst_percentage": 12.0,
        "shipping_policy": "flat_freight",
        "base_shipping_cost": 500.0,
        "estimated_delivery_days": 4,
        "supplier_rating": 4.7,
        "review_count": 119,
        "verified_seller": True,
        "food_grade_certified": True,
        "biodegradable": False,
        "location_city": "Jaipur Pottery District, Rajasthan",
        "contact_phone": "+91 94148 22119",
        "contact_email": "wholesale@clayvibe.in",
        "evidence_snippet": "Extract from bizongo.com: 'Modern minimalist stoneware mugs. Microwave & oven safe. Delhi NCR express freight 4 days.'",
        "missing_or_risk_notes": []
    }
]

# Master Mapping by Category Key
CATEGORY_MAP = {
    "packaging & containers": PACKAGING_SUPPLIERS,
    "packaging": PACKAGING_SUPPLIERS,
    "containers": PACKAGING_SUPPLIERS,
    "artisan handicraft & brass": BRASS_SUPPLIERS,
    "brass": BRASS_SUPPLIERS,
    "handicraft": BRASS_SUPPLIERS,
    "textiles & cotton canvas": TEXTILE_SUPPLIERS,
    "textiles": TEXTILE_SUPPLIERS,
    "cotton": TEXTILE_SUPPLIERS,
    "woodcraft & timber blanks": WOOD_SUPPLIERS,
    "wood": WOOD_SUPPLIERS,
    "woodcraft": WOOD_SUPPLIERS,
    "drinkware & ceramics": CERAMICS_SUPPLIERS,
    "ceramics": CERAMICS_SUPPLIERS,
    "mugs": CERAMICS_SUPPLIERS
}

def generate_custom_supplier_pool(item_name: str, category: str, quantity: int = 5000, budget: float = 20000.0) -> List[Dict[str, Any]]:
    """Dynamically generates a realistic supplier pool for any user-provided search term."""
    target_unit = max(1.5, budget / max(quantity, 1))
    p1 = round(target_unit * 0.88, 2)
    p2 = round(target_unit * 0.95, 2)
    p3 = round(target_unit * 1.05, 2)
    p4 = round(target_unit * 1.15, 2)
    p5_trap = round(target_unit * 0.70, 2)

    return [
        {
            "id": "sup-custom-bizongo",
            "supplier_name": f"Apex {item_name.split()[0]} Manufacturers (Bizongo Partner)",
            "source_domain": "bizongo.com",
            "source_url": f"https://www.bizongo.com/b2b-wholesale/{item_name.lower().replace(' ', '-')}",
            "product_title": f"Commercial Wholesale {item_name} (Verified Specification)",
            "product_image": "https://images.unsplash.com/photo-1578496781985-452d4a934d50?w=600&auto=format&fit=crop&q=80",
            "category": category or "Wholesale Supplies",
            "base_unit_price": p1,
            "moq": max(500, int(quantity * 0.2)),
            "tiered_pricing": [
                {"min_qty": int(quantity * 0.2), "unit_price": round(p1 * 1.2, 2)},
                {"min_qty": int(quantity * 0.5), "unit_price": round(p1 * 1.1, 2)},
                {"min_qty": quantity, "unit_price": p1}
            ],
            "gst_percentage": 18.0,
            "shipping_policy": "free_over_10k",
            "base_shipping_cost": 450.0,
            "estimated_delivery_days": 4,
            "supplier_rating": 4.8,
            "review_count": 215,
            "verified_seller": True,
            "food_grade_certified": True,
            "biodegradable": True,
            "location_city": "Delhi NCR Logistics Hub",
            "contact_phone": "+91 98110 55432",
            "contact_email": "orders@apexwholesale.in",
            "evidence_snippet": f"Extract from bizongo.com: 'Industrial-grade specification for {item_name}. Automated bulk dispatch with live GPS tracking. Free freight over ₹10,000.'",
            "missing_or_risk_notes": []
        },
        {
            "id": "sup-custom-indiamart",
            "supplier_name": f"National {item_name.split()[0]} Guild Works",
            "source_domain": "indiamart.com",
            "source_url": f"https://www.indiamart.com/wholesale/{item_name.lower().replace(' ', '-')}.html",
            "product_title": f"Direct Factory {item_name} with Standard Quality Assurance",
            "product_image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
            "category": category or "Wholesale Supplies",
            "base_unit_price": p2,
            "moq": max(1000, int(quantity * 0.3)),
            "tiered_pricing": [
                {"min_qty": int(quantity * 0.3), "unit_price": round(p2 * 1.15, 2)},
                {"min_qty": quantity, "unit_price": p2}
            ],
            "gst_percentage": 12.0,
            "shipping_policy": "flat_freight",
            "base_shipping_cost": 480.0,
            "estimated_delivery_days": 5,
            "supplier_rating": 4.6,
            "review_count": 134,
            "verified_seller": True,
            "food_grade_certified": True,
            "biodegradable": False,
            "location_city": "Okhla Phase II, New Delhi",
            "contact_phone": "+91 98710 44321",
            "contact_email": "sales@nationalguildworks.com",
            "evidence_snippet": f"Extract from indiamart.com: 'TrustSEAL Verified 6-year exporter. Full compliance documentation for {item_name}. Fast dispatch in 4-5 days.'",
            "missing_or_risk_notes": []
        },
        {
            "id": "sup-custom-tradeindia",
            "supplier_name": f"EcoDirect {item_name.split()[0]} Enterprises",
            "source_domain": "tradeindia.com",
            "source_url": f"https://www.tradeindia.com/products/{item_name.lower().replace(' ', '-')}",
            "product_title": f"Sustainable Premium {item_name}",
            "product_image": "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=600&auto=format&fit=crop&q=80",
            "category": category or "Wholesale Supplies",
            "base_unit_price": p3,
            "moq": max(500, int(quantity * 0.25)),
            "tiered_pricing": [
                {"min_qty": int(quantity * 0.25), "unit_price": round(p3 * 1.1, 2)},
                {"min_qty": quantity, "unit_price": p3}
            ],
            "gst_percentage": 12.0,
            "shipping_policy": "free_over_10k",
            "base_shipping_cost": 400.0,
            "estimated_delivery_days": 6,
            "supplier_rating": 4.9,
            "review_count": 310,
            "verified_seller": True,
            "food_grade_certified": True,
            "biodegradable": True,
            "location_city": "Greater Noida, UP",
            "contact_phone": "+91 99580 88712",
            "contact_email": "wholesale@ecodirect.in",
            "evidence_snippet": f"Extract from tradeindia.com: 'Certified environmentally compliant production of {item_name}. Delivered door-to-door.'",
            "missing_or_risk_notes": []
        },
        {
            "id": "sup-custom-trap",
            "supplier_name": f"Discount {item_name.split()[0]} Bazaar Traders",
            "source_domain": "indiamart.com",
            "source_url": f"https://www.indiamart.com/discounttraders/{item_name.lower().replace(' ', '-')}.html",
            "product_title": f"Budget Clearance {item_name}",
            "product_image": "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80",
            "category": category or "Wholesale Supplies",
            "base_unit_price": p5_trap,
            "moq": quantity * 4,  # MOQ Trap!
            "tiered_pricing": [
                {"min_qty": quantity * 4, "unit_price": p5_trap},
                {"min_qty": quantity, "unit_price": round(target_unit * 1.35, 2)}
            ],
            "gst_percentage": 18.0,
            "shipping_policy": "flat_freight",
            "base_shipping_cost": 650.0,
            "estimated_delivery_days": 7,
            "supplier_rating": 3.8,
            "review_count": 38,
            "verified_seller": False,
            "food_grade_certified": False,
            "biodegradable": False,
            "location_city": "Industrial Area, Jaipur",
            "contact_phone": "+91 94140 22119",
            "contact_email": "sales@discountbazaar.in",
            "evidence_snippet": f"Extract from indiamart.com: 'Headline rate of ₹{p5_trap} strictly requires full master container order of {quantity * 4:,} units. Sub-lots billed at ₹{round(target_unit * 1.35, 2)}/unit.'",
            "missing_or_risk_notes": [
                f"MOQ Trap: Headline price ₹{p5_trap} requires ordering {quantity * 4:,} units. Sub-lot pricing applies for smaller quantities."
            ]
        }
    ]

def get_raw_supplier_pool(
    category: str = "",
    item_name: str = "",
    quantity: int = 5000,
    budget: float = 20000.0
) -> List[Dict[str, Any]]:
    """Returns realistic supplier pool filtered or tailored to category and query."""
    key = (category or "").strip().lower()
    item_key = (item_name or "").strip().lower()

    # Match predefined category pools
    for cat_name, pool in CATEGORY_MAP.items():
        if cat_name in key or cat_name in item_key:
            return pool

    # If item name contains known materials
    if any(k in item_key for k in ["kraft", "container", "box", "bagasse", "pack", "tray", "bowl"]):
        return PACKAGING_SUPPLIERS
    if any(k in item_key for k in ["brass", "metal", "hardware", "casting", "fitting"]):
        return BRASS_SUPPLIERS
    if any(k in item_key for k in ["cotton", "canvas", "textile", "fabric", "yarn"]):
        return TEXTILE_SUPPLIERS
    if any(k in item_key for k in ["wood", "timber", "sheesham", "carving", "log"]):
        return WOOD_SUPPLIERS
    if any(k in item_key for k in ["ceramic", "mug", "cup", "pottery", "clay"]):
        return CERAMICS_SUPPLIERS

    # If specific query provided but outside presets, dynamically generate
    if item_name and item_name != "Food Containers (750ml)":
        return generate_custom_supplier_pool(item_name, category, quantity, budget)

    return PACKAGING_SUPPLIERS
