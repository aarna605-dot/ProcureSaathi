import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  TrendingDown, 
  Truck, 
  BadgePercent, 
  Send
} from 'lucide-react';

export default function NegotiationModal({ offer, allOffers = [], currentQuantity = 5000, onClose }) {
  const [strategy, setStrategy] = useState('price_match'); // 'price_match' | 'freight_waiver' | 'cash_discount'
  const [copied, setCopied] = useState(false);

  if (!offer) return null;

  const { supplier_name, contact, applicable_unit_price, cost_breakdown } = offer;
  const lowestOffer = [...allOffers].sort((a, b) => a.cost_breakdown.total_landed_cost - b.cost_breakdown.total_landed_cost)[0];
  const lowestRate = lowestOffer?.applicable_unit_price || 2.85;

  // Generate negotiation script based on selected strategy
  const getNegotiationScript = () => {
    if (strategy === 'price_match') {
      return `Dear ${supplier_name} Sales Team,

We have reviewed your quotation for ${currentQuantity.toLocaleString('en-IN')} units of ${offer.product_title || 'raw material packaging'} at ₹${applicable_unit_price.toFixed(2)}/unit.

We have received an audited, verified quotation from another certified supplier offering ₹${lowestRate.toFixed(2)}/unit with guaranteed doorstep delivery. 

We prefer your manufacturing turnaround and quality standards. If you can match ₹${lowestRate.toFixed(2)}/unit (or ₹${(applicable_unit_price * 0.95).toFixed(2)}/unit all-inclusive landed), we are prepared to release our formal Purchase Order and advance payment within 24 hours.

Please confirm if you can approve this price revision so we can proceed immediately.

Best regards,
Procurement Desk`;
    }

    if (strategy === 'freight_waiver') {
      const freightCost = cost_breakdown?.freight_cost || 1480;
      return `Dear ${supplier_name} Logistics & Accounts,

Regarding our upcoming requirement of ${currentQuantity.toLocaleString('en-IN')} units:

Your base unit rate of ₹${applicable_unit_price.toFixed(2)} is competitive; however, the doorstep freight levy of ₹${freightCost.toLocaleString('en-IN')} impacts our margin threshold.

For this order volume, can you absorb or waive the freight cost (or offer free transit delivery to our destination)? If approved, we will lock this as a standing recurring monthly order.

Awaiting your confirmation.

Best regards,
Procurement Desk`;
    }

    // Cash discount strategy
    return `Dear ${supplier_name} Management,

We are finalizing procurement for ${currentQuantity.toLocaleString('en-IN')} units under PO.

We can commit to 100% immediate RTGS/UPI payment upon invoice generation (zero credit period). In exchange for zero credit risk and instantaneous cash flow, we request a standard 6% prompt payment discount, reducing the lot total from ₹${(cost_breakdown?.total_landed_cost || 0).toLocaleString('en-IN')} to ₹${Math.round((cost_breakdown?.total_landed_cost || 0) * 0.94).toLocaleString('en-IN')}.

Kindly issue the revised proforma invoice so our finance team can remit the funds today.

Best regards,
Procurement Desk`;
  };

  const script = getNegotiationScript();

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    if (contact?.phone) {
      const cleanPhone = contact.phone.replace(/[^0-9]/g, '');
      const url = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(script)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } else if (contact?.whatsapp_url) {
      window.open(contact.whatsapp_url, '_blank', 'noopener,noreferrer');
    } else {
      handleCopy();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <span className="negotiation-badge">
                STRATEGIC B2B LEVERAGE
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Counter-Offer & Negotiation Assistant
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Data-backed counter-offer script tailored for <strong>{supplier_name}</strong>
            </p>
          </div>
          <button className="btn-close" onClick={onClose} title="Close Modal">
            <X size={20} />
          </button>
        </div>

        {/* Strategy Selection Pills */}
        <div style={{ margin: '1rem 0' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Choose Negotiation Angle:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            <button
              type="button"
              className={`strategy-tab-btn ${strategy === 'price_match' ? 'active' : ''}`}
              onClick={() => setStrategy('price_match')}
            >
              <TrendingDown size={14} />
              <span>Competitive Price Match</span>
            </button>
            <button
              type="button"
              className={`strategy-tab-btn ${strategy === 'freight_waiver' ? 'active' : ''}`}
              onClick={() => setStrategy('freight_waiver')}
            >
              <Truck size={14} />
              <span>Free Freight Waiver</span>
            </button>
            <button
              type="button"
              className={`strategy-tab-btn ${strategy === 'cash_discount' ? 'active' : ''}`}
              onClick={() => setStrategy('cash_discount')}
            >
              <BadgePercent size={14} />
              <span>Prompt Cash Advance</span>
            </button>
          </div>
        </div>

        {/* Script Preview Box */}
        <div style={{ position: 'relative', marginTop: '0.75rem' }}>
          <textarea
            readOnly
            value={script}
            rows={10}
            className="rfq-textarea"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: '1.5', resize: 'none' }}
          />
          <button
            type="button"
            className="btn-copy-floating"
            onClick={handleCopy}
            title="Copy script to clipboard"
          >
            {copied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy Message'}</span>
          </button>
        </div>

        {/* Modal Actions */}
        <div className="modal-actions-row" style={{ marginTop: '1.25rem' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn-whatsapp"
            onClick={handleSendWhatsApp}
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <Send size={15} />
            <span>Send Counter-Offer on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
