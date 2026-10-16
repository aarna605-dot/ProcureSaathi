import React from 'react';
import { Sparkles, Sliders, ShieldCheck, Globe, Zap } from 'lucide-react';

export default function Header({ onOpenSettings, executionMode, isTinyFishConfigured }) {
  return (
    <header className="app-header">
      <div className="brand-section">
        <div className="brand-logo-icon">
          <Sparkles size={24} />
        </div>
        <div>
          <div className="brand-name">
            ProcureSaathi
            <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              AI Copilot
            </span>
          </div>
          <div className="brand-tagline">
            Autonomous B2B Sourcing & Verified Landed Cost Intelligence
          </div>
        </div>
      </div>

      <div className="header-badges">
        <div className="tinyfish-badge" title="TinyFish Web Operating Platform for AI Agents">
          <span className="dot"></span>
          <Globe size={14} />
          <span>TinyFish Web Agent: {executionMode === 'tinyfish_live' ? 'Live Mode' : 'Connected'}</span>
        </div>

        <button 
          id="btn-settings"
          className="btn-icon-subtle" 
          onClick={onOpenSettings}
          title="Configure TinyFish API Key and Agent Settings"
        >
          <Sliders size={15} />
          <span>Agent Settings</span>
        </button>
      </div>
    </header>
  );
}
