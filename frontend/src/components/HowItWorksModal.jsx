import React from 'react';
import { 
  X, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  Truck, 
  Percent 
} from 'lucide-react';

export default function HowItWorksModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.74rem', color: '#059669', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.06em' }}>
              ScoutB2B Intelligence Guide
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              How TinyFish Powers True Landed Cost
            </h3>
          </div>
          <button className="btn-close" onClick={onClose} title="Close Modal">
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
            Traditional B2B directories like IndiaMART and Moglix can display low headline prices that omit costs. ScoutB2B helps buyers compare the landed cost and supplier terms before requesting a quote:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
            <div style={{ padding: '0.95rem', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e11d48', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                <Percent size={14} />
                <span>1. Deceptive GST Exclusion</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                Headline prices exclude 12% to 18% GST until checkout. We calculate exact GST upfront for transparent comparison.
              </p>
            </div>

            <div style={{ padding: '0.95rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#d97706', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                <AlertTriangle size={14} />
                <span>2. MOQ Penalty Traps</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                Advertised ₹2.40 rate is conditioned on a 20,000 unit order. Ordering 5,000 units incurs penalty pricing of ₹4.30+.
              </p>
            </div>

            <div style={{ padding: '0.95rem', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0284c7', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                <Truck size={14} />
                <span>3. Hidden Freight & Shipping</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                Interstate shipping fees (e.g. Bhiwandi to Delhi) wipe out savings. We identify local suppliers and free shipping thresholds.
              </p>
            </div>

            <div style={{ padding: '0.95rem', background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#4f46e5', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                <ShieldCheck size={14} />
                <span>4. Trust & Food Safety</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                TinyFish extracts active TrustSeals, FSSAI food-grade safety certifications, and verified customer review counts.
              </p>
            </div>
          </div>

          <div style={{ padding: '1.15rem', background: '#ecfdf5', border: '1px solid rgba(5, 150, 105, 0.2)', borderRadius: '14px' }}>
            <h4 style={{ fontSize: '0.94rem', fontWeight: 800, color: '#065f46', marginBottom: '0.45rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} color="#059669" />
              <span>The Autonomous TinyFish 4-Step Pipeline</span>
            </h4>
            <div style={{ fontSize: '0.82rem', color: '#065f46', lineHeight: 1.55 }}>
              1. <strong>NLP Intent Extraction:</strong> Parses your freeform prompt into Quantity, Budget, Deadline, and Destination.<br />
              2. <strong>TinySearch:</strong> Discovers live product listings across IndiaMART, Moglix, Bizongo, and direct manufacturer domains.<br />
              3. <strong>TinyFetch Chromium Rendering:</strong> Executes stealth scraping to extract wholesale slabs, GST terms, and dispatch lead times.<br />
              4. <strong>1-Click RFQ:</strong> Generates tailored WhatsApp & Email drafts so you can close deals with one tap.
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.65rem 1.6rem' }}
              onClick={onClose}
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
