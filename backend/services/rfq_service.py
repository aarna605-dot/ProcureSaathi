import urllib.parse
from typing import Dict, Any
from models.supplier import SupplierContact

def generate_rfq_draft(
    supplier_name: str,
    product_title: str,
    quantity: int,
    applicable_unit_price: float,
    total_landed_cost: float,
    delivery_days_limit: int,
    delivery_city: str,
    phone: str,
    email: str,
    location_city: str
) -> SupplierContact:
    """
    Constructs a professional B2B quotation / RFQ message
    and a 1-click WhatsApp click-to-chat URL.
    """
    message_text = (
        f"Namaste {supplier_name},\n\n"
        f"I am writing via ProcureSaathi regarding your listing for:\n"
        f"*{product_title}*\n\n"
        f"📋 Order Details:\n"
        f"• Required Quantity: {quantity:,} units\n"
        f"• Target Delivery: Within {delivery_days_limit} days to {delivery_city}\n"
        f"• Quoted Unit Slab: ₹{applicable_unit_price:.2f} / unit\n"
        f"• Estimated Landed Total: ₹{total_landed_cost:,.2f} (incl. GST & Freight)\n"
        f"• Requirement: Food-grade / FSSAI compliant packing\n\n"
        f"Could you please confirm sample availability, proforma invoice dispatch, and payment terms?\n\n"
        f"Regards,\nProcureSaathi Business Buyer"
    )

    clean_phone = "".join([c for c in (phone or "") if c.isdigit()])
    if len(clean_phone) == 10:
        clean_phone = "91" + clean_phone

    encoded_text = urllib.parse.quote(message_text)
    whatsapp_url = f"https://wa.me/{clean_phone}?text={encoded_text}" if clean_phone else None

    return SupplierContact(
        phone=phone,
        email=email,
        location_city=location_city,
        whatsapp_url=whatsapp_url,
        rfq_draft=message_text
    )
