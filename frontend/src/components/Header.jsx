import React from 'react';
import { Sparkles, Sliders, Globe, HelpCircle, Film } from 'lucide-react';

export default function Header({ onOpenSettings, onOpenExplainer, onOpenStory, executionMode, isTinyFishConfigured }) {
  return (
    <header className="app-header">
      <div className="brand-section">
        <div className="brand-logo-icon">
          <Sparkles size={20} />
        </div>
        <div>
          <div className="brand-name">
            ScoutB2B
          </div>
          <div className="brand-tagline">
            Transparent wholesale raw materials & packaging procurement
          </div>
        </div>
      </div>

      <div className="header-badges">
        {onOpenStory && (
          <button
            type="button"
            className="btn-icon-subtle"
            onClick={onOpenStory}
            title="Watch the cinematic origin story video"
            style={{ fontWeight: 600 }}
          >
            <Film size={14} color="#111827" />
            <span>Origin Story</span>
          </button>
        )}

        {onOpenExplainer && (
          <button
            type="button"
            className="btn-icon-subtle"
            onClick={onOpenExplainer}
            title="Read intelligence guide on deceptive pricing and true landed costs"
          >
            <HelpCircle size={14} color="var(--bg-dark-forest)" />
            <span>How it works</span>
          </button>
        )}

        <div className="tinyfish-badge" title="TinyFish Web Operating Platform for AI Agents">
          <span className="dot"></span>
          <Globe size={13} />
          <span>TinyFish: {executionMode === 'tinyfish_live' ? 'Live Agent' : (isTinyFishConfigured ? 'Active' : 'Connected')}</span>
        </div>

        <button 
          id="btn-settings"
          type="button"
          className="btn-icon-subtle" 
          onClick={onOpenSettings}
          title="Configure TinyFish API Key and Agent Settings"
        >
          <Sliders size={14} />
          <span>Settings</span>
        </button>
      </div>
    </header>
  );
}
