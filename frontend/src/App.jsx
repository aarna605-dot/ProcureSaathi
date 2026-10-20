import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RequirementForm from './components/RequirementForm';
import AgentTelemetry from './components/AgentTelemetry';
import ComparisonMatrix from './components/ComparisonMatrix';
import CostBreakdownModal from './components/CostBreakdownModal';
import RFQModal from './components/RFQModal';
import SettingsModal from './components/SettingsModal';
import HowItWorksModal from './components/HowItWorksModal';
import Hero3DParcel from './components/Hero3DParcel';
import StickFigureStoryMovie from './components/StickFigureStoryMovie';
import { searchProcurement, recalculateCosts } from './services/api';
import { AlertCircle } from 'lucide-react';
import './App.css';

export default function App() {
  const [procurementData, setProcurementData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Modals state
  const [inspectOffer, setInspectOffer] = useState(null);
  const [rfqOffer, setRfqOffer] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  const [showStory, setShowStory] = useState(true);

  // TinyFish API key persisted in localStorage
  const [tinyFishApiKey, setTinyFishApiKey] = useState(() => {
    return localStorage.getItem('procuresaathi_tf_key') || '';
  });

  const handleSaveApiKey = (key) => {
    setTinyFishApiKey(key);
    localStorage.setItem('procuresaathi_tf_key', key);
  };

  const executeSearch = async (params) => {
    setIsLoading(true);
    setErrorMsg(null);
    setProcurementData(null);
    try {
      const result = await searchProcurement(params, tinyFishApiKey);
      setProcurementData(result);
    } catch (err) {
      console.error("Procurement search failed:", err);
      setErrorMsg(err.message || "Failed to communicate with procurement agent.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecalculate = async (newQuantity) => {
    if (!procurementData) return;
    try {
      const summary = procurementData.request_summary;
      const res = await recalculateCosts({
        quantity: newQuantity,
        max_budget: summary.max_budget,
        delivery_days_limit: summary.delivery_days_limit,
        item_name: summary.item_name,
        query_text: summary.query_text,
        delivery_city: summary.delivery_city,
        category: summary.category || "Packaging & Containers"
      });

      setProcurementData((prev) => ({
        ...prev,
        request_summary: {
          ...prev.request_summary,
          quantity: newQuantity
        },
        offers: res.offers,
        market_benchmark: res.market_benchmark
      }));
    } catch (err) {
      console.error("Recalculate failed:", err);
    }
  };

  const handleScrollToContent = () => {
    const el = document.getElementById('platform-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Keep the landing intro at the top; supplier results only load after form submission.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="site-wrapper">
      {/* Full-screen 2D Stick Figure Animated Cartoon Movie */}
      {showStory && (
        <StickFigureStoryMovie onComplete={() => setShowStory(false)} />
      )}

      {/* 100vh Pure Landing Hero (No Header, Tagline & Rotating 3D Figure + Scroll CTA) */}
      <Hero3DParcel 
        onScrollDown={handleScrollToContent} 
        onReplayStory={() => setShowStory(true)}
      />

      {/* Main Procurement Platform Suite (Revealed on Scroll Down) */}
      <div id="platform-section" className="app-container platform-view">
        <Header
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenExplainer={() => setIsExplainerOpen(true)}
          onOpenStory={() => setShowStory(true)}
          executionMode={procurementData?.execution_mode || 'simulation'}
          isTinyFishConfigured={Boolean(tinyFishApiKey)}
        />


        {/* Requirement Input Form */}
        <RequirementForm
          onSearch={executeSearch}
          isLoading={isLoading}
        />

        {errorMsg && (
          <div style={{ padding: '1rem 1.25rem', marginBottom: '2rem', borderRadius: '14px', border: '1px solid #111827', background: '#f3f4f6', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#111827', fontSize: '0.88rem' }}>
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Live Agent Telemetry Stream */}
        {procurementData && (
          <AgentTelemetry
            steps={procurementData.agent_telemetry}
            isLive={procurementData.execution_mode === 'tinyfish_live'}
            executionMode={procurementData.execution_mode}
            executionTime={procurementData.execution_time_seconds}
          />
        )}

        {/* Comparison Results */}
        {procurementData && (
          <ComparisonMatrix
            offers={procurementData.offers}
            marketBenchmark={procurementData.market_benchmark}
            currentQuantity={procurementData.request_summary.quantity}
            maxBudget={procurementData.request_summary.max_budget}
            deliveryDaysLimit={procurementData.request_summary.delivery_days_limit}
            onRecalculate={handleRecalculate}
            onInspectOffer={(offer) => setInspectOffer(offer)}
            onOpenRFQ={(offer) => setRfqOffer(offer)}
          />
        )}

        {/* Clean Minimalist Footer */}
        <footer style={{ marginTop: '5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <p>
            ScoutB2B • Transparent wholesale supplier discovery • Powered by TinyFish Web Platform
          </p>
        </footer>
      </div>

      {/* Modals */}
      <CostBreakdownModal
        offer={inspectOffer}
        quantity={procurementData?.request_summary?.quantity || 5000}
        onClose={() => setInspectOffer(null)}
        onOpenRFQ={(offer) => setRfqOffer(offer)}
      />

      <RFQModal
        offer={rfqOffer}
        onClose={() => setRfqOffer(null)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentApiKey={tinyFishApiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      <HowItWorksModal
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />
    </div>
  );
}
