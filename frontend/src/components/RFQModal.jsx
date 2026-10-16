import React, { useState } from 'react';
import { X, MessageSquare, Copy, Check, Send, Phone, Mail, MapPin } from 'lucide-react';

export default function RFQModal({ offer, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!offer) return null;

  const { supplier_name, contact, applicable_unit_price, cost_breakdown } = offer;
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
            <span style={{ fontSize: '0.75rem', color: 'var(--emerald-400)', textTransform: 'uppercase', fontWeight: 700 }}>
              1-Click Supplier RFQ
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
              Direct Supplier Quotation Draft
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Ready to send directly to <strong>{supplier_name}</strong>
            </p>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Supplier details bar */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', padding: '0.75rem 1rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '1.25rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          {contact?.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Phone size={13} color="#10b981" />
              <span>{contact.phone}</span>
            </div>
          )}
          {contact?.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Mail size={13} color="#6366f1" />
              <span>{contact.email}</span>
            </div>
          )}
          {contact?.location_city && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={13} color="#f59e0b" />
              <span>{contact.location_city}</span>
            </div>
          )}
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
              background: '#0a0f1a',
              border: '1px solid var(--border-medium)',
              borderRadius: '10px',
              color: '#f8fafc',
              fontFamily: 'monospace',
              fontSize: '0.84rem',
              lineHeight: 1.45,
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
            {copied ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
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
