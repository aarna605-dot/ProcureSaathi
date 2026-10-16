import React from 'react';
import { X, CheckCircle, ShieldCheck, AlertTriangle, FileText, Truck, Percent, IndianRupee, ExternalLink } from 'lucide-react';

export default function CostBreakdownModal({ offer, quantity, onClose, onOpenRFQ }) {
  if (!offer) return null;

  const { cost_breakdown: cb, supplier_name, product_title, evidence_snippet, missing_or_risk_notes, source_url } = offer;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--emerald-400)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
              True Landed Cost Breakdown
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
              {supplier_name}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {product_title}
            </p>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Cost Waterfall Details */}
        <div style={{ background: 'rgba(7, 11, 18, 0.7)', borderRadius: '12px', padding: '1.25rem', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>Order Quantity</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{quantity.toLocaleString()} units</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <IndianRupee size={14} /> Base Subtotal ({quantity.toLocaleString()} × ₹{offer.applicable_unit_price.toFixed(2)})
              </span>
              <span style={{ fontWeight: 600, color: '#fff' }}>₹{cb.base_subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Percent size={14} /> GST Tax ({cb.gst_percentage}%)
              </span>
              <span style={{ fontWeight: 600, color: '#fff' }}>+ ₹{cb.gst_amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Truck size={14} /> Freight & Logistics Shipping
              </span>
              <span style={{ fontWeight: 600, color: cb.shipping_cost === 0 ? 'var(--emerald-400)' : '#fff' }}>
                {cb.shipping_cost === 0 ? 'FREE (Bulk Waiver)' : `+ ₹${cb.shipping_cost.toFixed(2)}`}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>
                🛡️ Transit Handling & Inspection (1%)
              </span>
              <span style={{ fontWeight: 600, color: '#fff' }}>+ ₹{cb.handling_fee.toFixed(2)}</span>
            </div>

            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-medium)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--emerald-400)', textTransform: 'uppercase' }}>
                  Total Landed Cost
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Effective cost: <strong style={{ color: '#fff' }}>₹{cb.effective_unit_cost.toFixed(2)} / unit</strong>
                </div>
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
                ₹{cb.total_landed_cost.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        </div>

        {/* Live Evidence from Supplier Website */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FileText size={14} color="#6366f1" />
            <span>Extracted Evidence (Via TinyFetch Live Chromium Instance)</span>
          </div>
          <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.25)', borderRadius: '8px', padding: '0.85rem', fontSize: '0.82rem', color: '#c7d2fe', lineHeight: 1.5 }}>
            "{evidence_snippet}"
          </div>
        </div>

        {/* Missing or Risk Notes */}
        {missing_or_risk_notes && missing_or_risk_notes.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--amber-400)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <AlertTriangle size={14} />
              <span>Notices & Verification Cautions</span>
            </div>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
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
              <span>Source Listing</span>
            </a>
          )}
          <button
            className="btn-whatsapp"
            style={{ flex: 1.5 }}
            onClick={() => {
              onClose();
              onOpenRFQ(offer);
            }}
          >
            <span>💬 Prepare Supplier RFQ</span>
          </button>
        </div>
      </div>
    </div>
  );
}
