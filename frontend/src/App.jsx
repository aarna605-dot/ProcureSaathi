import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import RequirementForm from './components/RequirementForm';
import AgentTelemetry from './components/AgentTelemetry';
import ComparisonMatrix from './components/ComparisonMatrix';
import CostBreakdownModal from './components/CostBreakdownModal';
import RFQModal from './components/RFQModal';
import SettingsModal from './components/SettingsModal';
import { searchProcurement, recalculateCosts, checkBackendHealth } from './services/api';
import { Sparkles, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

export default function App() {
  const [procurementData, setProcurementData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Modals state
  const [inspectOffer, setInspectOffer] = useState(null);
  const [rfqOffer, setRfqOffer] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
        delivery_city: summary.delivery_city,
        category: "Packaging & Containers"
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

  // Run initial default scenario on load
  useEffect(() => {
    executeSearch({
      query_text: "I need 5,000 food containers, under ₹20,000, delivered within seven days.",
      item_name: "Kraft Paper Food Containers (750ml)",
      quantity: 5000,
      max_budget: 20000,
      delivery_days_limit: 7,
      delivery_city: "New Delhi",
      category: "Packaging & Containers"
    });
  }, []);

  return (
    <div className="app-container">
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        executionMode={procurementData?.execution_mode || 'simulation'}
        isTinyFishConfigured={Boolean(tinyFishApiKey)}
      />

      {/* Hero Header */}
      <section className="hero-section">
        <div className="hero-pill">
          <Sparkles size={14} />
          <span>AI-Powered B2B Sourcing for Restaurants & Small Businesses</span>
        </div>
        <h1 className="hero-title">
          Never Pay Advertised Prices. <br />
          Find <span className="gradient-text">True Landed Costs</span> Instantly.
        </h1>
        <p className="hero-subtitle">
          ProcureSaathi deploys autonomous <strong>TinyFish Web Agents</strong> to crawl live supplier catalogs, normalize hidden GST and freight charges, expose MOQ traps, and generate direct quotation links.
        </p>
      </section>

      {/* Requirement Input Form */}
      <RequirementForm
        onSearch={executeSearch}
        isLoading={isLoading}
      />

      {errorMsg && (
        <div className="glass-panel" style={{ padding: '1rem 1.5rem', marginBottom: '2rem', borderColor: 'var(--rose-500)', background: 'rgba(244, 63, 94, 0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fca5a5' }}>
          <AlertCircle size={20} />
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

      {/* Footer */}
      <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <p>
          ProcureSaathi • Built with 💚 for Small Businesses, Cloud Kitchens & Kirana Stores • Powered by <strong>TinyFish Web Agent Engine</strong>
        </p>
      </footer>
    </div>
  );
}
