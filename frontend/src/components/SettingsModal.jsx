import React, { useState, useEffect } from 'react';
import { X, Key, Shield, ExternalLink, Save, CheckCircle } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, currentApiKey, onSaveApiKey }) {
  const [apiKey, setApiKey] = useState(currentApiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setApiKey(currentApiKey || '');
  }, [currentApiKey]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveApiKey(apiKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span style={{ fontSize: '0.75rem', color: '#818cf8', textTransform: 'uppercase', fontWeight: 700 }}>
              Configuration
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginTop: '0.2rem' }}>
              TinyFish Web Agent Settings
            </h3>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              TinyFish API Key
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="input-tinyfish-key"
                type="password"
                className="field-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Enter your TinyFish key (optional for hackathon demo)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <Key size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem', lineHeight: 1.4 }}>
              ProcureSaathi connects directly to <code>api.search.tinyfish.ai</code> and <code>api.fetch.tinyfish.ai</code>. If empty, the system runs in high-fidelity B2B simulation mode so demos never break.
            </p>
          </div>

          <div style={{ padding: '0.85rem', background: 'rgba(99, 102, 241, 0.08)', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.2)', marginBottom: '1.5rem', fontSize: '0.8rem', color: '#c7d2fe' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Need a TinyFish developer key?</span>
              <a
                href="https://agent.tinyfish.ai/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#818cf8', fontWeight: 600 }}
              >
                <span>Get Free Key</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" id="btn-save-key" className="btn-primary">
              {savedSuccess ? (
                <>
                  <CheckCircle size={16} />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save size={16} />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
