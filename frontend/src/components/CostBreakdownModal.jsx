import React from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Truck, 
  Percent, 
  IndianRupee, 
  ExternalLink
} from 'lucide-react';

export default function CostBreakdownModal({ offer, quantity, onClose, onOpenRFQ }) {
  if (!offer) return null;

  const { cost_breakdown: cb, supplier_name, product_title, evidence_snippet, missing_or_risk_notes, source_url, source_domain } = offer;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-primary)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.06em' }}>
                True Landed Cost Waterfall
              </span>
              <span className="domain-pill">{source_domain}</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {supplier_name}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              {product_title}
            </p>
          </div>
          <button className="btn-close" onClick={onClose} title="Close Modal">
            <X size={20} />
          </button>
        </div>

        {/* Cost Waterfall Details Card */}
        <div style={{ background: '#f9fafb', borderRadius: '16px', padding: '1.35rem', border: '1px solid var(--border-subtle)', marginBottom: '1.35rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Evaluated Order Quantity</span>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>{quantity.toLocaleString()} units</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Step 1: Base Subtotal */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <IndianRupee size={14} color="var(--text-primary)" />
                <span>Base Subtotal ({quantity.toLocaleString()} × ₹{offer.applicable_unit_price.toFixed(2)})</span>
              </span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>₹{cb.base_subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>

            {/* Step 2: GST */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Percent size={14} color="var(--text-primary)" />
                <span>GST Tax Surcharge ({cb.gst_percentage}%)</span>
              </span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>+ ₹{cb.gst_amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>

            {/* Step 3: Freight */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Truck size={14} color="var(--text-primary)" />
                <span>Freight Logistics & Shipping</span>
              </span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                {cb.shipping_cost === 0 ? 'FREE (Bulk Threshold Met)' : `+ ₹${cb.shipping_cost.toFixed(2)}`}
              </span>
            </div>

            {/* Step 4: Handling */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={14} color="var(--text-primary)" />
                <span>Transit Handling & Inspection (1%)</span>
              </span>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>+ ₹{cb.handling_fee.toFixed(2)}</span>
            </div>

            {/* Total Landed Cost Result */}
            <div style={{ marginTop: '0.85rem', paddingTop: '0.85rem', borderTop: '1px solid var(--border-medium)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  True Landed Cost
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Effective rate: <strong style={{ color: 'var(--text-primary)' }}>₹{cb.effective_unit_cost.toFixed(2)} / unit</strong>
                </div>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ₹{cb.total_landed_cost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* Live Extracted Evidence via Chromium */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FileText size={14} color="var(--text-primary)" />
            <span>Extracted Evidence (Via TinyFish Headless Chromium Session)</span>
          </div>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.85rem 1rem', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            "{evidence_snippet}"
          </div>
        </div>

        {/* Notices & Risk Verification Notes */}
        {missing_or_risk_notes && missing_or_risk_notes.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertTriangle size={14} />
              <span>Supplier Verification Cautions & Terms</span>
            </div>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {missing_or_risk_notes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {source_url && (
            <a
              href={source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ flex: 1 }}
            >
              <ExternalLink size={15} />
              <span>Source Catalog</span>
            </a>
          )}
          <button
            type="button"
            className="btn-whatsapp"
            style={{ flex: 1.4 }}
            onClick={() => {
              onClose();
              onOpenRFQ(offer);
            }}
          >
            <span>Contact Supplier on WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
