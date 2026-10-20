import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Copy, 
  Check, 
  Phone, 
  Mail, 
  MapPin, 
  Lightbulb
} from 'lucide-react';

export default function RFQModal({ offer, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!offer) return null;

  const { supplier_name, contact } = offer;
  const draft = contact?.rfq_draft || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendWhatsApp = () => {
    if (contact?.whatsapp_url) {
      window.open(contact.whatsapp_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-primary)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.06em' }}>
                1-Click Quotation Request
              </span>
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Direct Supplier RFQ Draft
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Tailored procurement message formatted for <strong>{supplier_name}</strong>
            </p>
          </div>
          <button className="btn-close" onClick={onClose} title="Close Modal">
            <X size={20} />
          </button>
        </div>

        {/* Supplier details bar */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: '0.85rem 1rem', background: '#f9fafb', borderRadius: '12px', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          {contact?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Phone size={14} color="var(--text-primary)" />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{contact.phone}</span>
            </div>
          )}
          {contact?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Mail size={14} color="var(--text-primary)" />
              <span>{contact.email}</span>
            </div>
          )}
          {contact?.location_city && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={14} color="var(--text-primary)" />
              <span>{contact.location_city}</span>
            </div>
          )}
        </div>

        {/* AI Negotiation Strategy Tip */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-start', 
          gap: '0.65rem', 
          padding: '0.85rem 1rem', 
          background: '#f3f4f6', 
          border: '1px solid var(--border-subtle)', 
          borderRadius: '12px', 
          marginBottom: '1.25rem',
          fontSize: '0.82rem',
          color: 'var(--text-primary)',
          lineHeight: 1.5
        }}>
          <Lightbulb size={16} color="var(--text-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>AI Negotiation Tip:</strong> Mention your requirement is a recurring monthly volume to request freight waiver or an additional 3%–5% cash-settlement discount.
          </div>
        </div>

        {/* Message preview */}
        <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
          <textarea
            readOnly
            value={draft}
            rows={10}
            style={{
              width: '100%',
              padding: '1rem',
              background: '#f9fafb',
              border: '1px solid var(--border-medium)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontFamily: 'monospace',
              fontSize: '0.84rem',
              lineHeight: 1.5,
              resize: 'none'
            }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCopy}
            style={{ flex: 1 }}
          >
            {copied ? <Check size={16} color="#059669" /> : <Copy size={16} />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy RFQ'}</span>
          </button>

          {contact?.whatsapp_url && (
            <button
              type="button"
              className="btn-whatsapp"
              onClick={handleSendWhatsApp}
              style={{ flex: 1.4 }}
            >
              <MessageSquare size={17} />
              <span>Open in WhatsApp</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
