import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Package, IndianRupee, Clock, MapPin, Sparkles, Wand2 } from 'lucide-react';
import { parseQuery } from '../services/api';

const PRESETS = [
  {
    id: 'containers-hackathon',
    label: '🍱 5,000 Food Containers (< ₹20k, 7 days)',
    query: 'I need 5,000 food containers, under ₹20,000, delivered within seven days.',
    item_name: 'Kraft Paper Food Containers (750ml)',
    quantity: 5000,
    max_budget: 20000,
    delivery_days_limit: 7,
    city: 'New Delhi'
  },
  {
    id: 'trays-eco',
    label: '🌱 2,500 Biodegradable Trays (< ₹15k, 5 days)',
    query: 'Need 2,500 biodegradable sugarcane bagasse 3-compartment meal trays under ₹15,000 within 5 days.',
    item_name: 'Biodegradable 3-Compartment Meal Trays',
    quantity: 2500,
    max_budget: 15000,
    delivery_days_limit: 5,
    city: 'Gurugram'
  },
  {
    id: 'cups-bulk',
    label: '☕ 10,000 Paper Coffee Cups (< ₹30k, 10 days)',
    query: 'Looking for 10,000 ripple wall paper coffee cups (250ml) with lids under ₹30,000 in 10 days.',
    item_name: 'Paper Cups with Lids (250ml)',
    quantity: 10000,
    max_budget: 30000,
    delivery_days_limit: 10,
    city: 'Noida'
  }
];

export default function RequirementForm({ onSearch, isLoading }) {
  const [queryText, setQueryText] = useState(PRESETS[0].query);
  const [activePreset, setActivePreset] = useState(PRESETS[0].id);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Structured fields
  const [itemName, setItemName] = useState(PRESETS[0].item_name);
  const [quantity, setQuantity] = useState(PRESETS[0].quantity);
  const [maxBudget, setMaxBudget] = useState(PRESETS[0].max_budget);
  const [deliveryDays, setDeliveryDays] = useState(PRESETS[0].delivery_days_limit);
  const [deliveryCity, setDeliveryCity] = useState(PRESETS[0].city);

  const handlePresetClick = (preset) => {
    setActivePreset(preset.id);
    setQueryText(preset.query);
    setItemName(preset.item_name);
    setQuantity(preset.quantity);
    setMaxBudget(preset.max_budget);
    setDeliveryDays(preset.delivery_days_limit);
    setDeliveryCity(preset.city);
  };

  const handleQueryChange = async (e) => {
    const val = e.target.value;
    setQueryText(val);
    setActivePreset('');
  };

  const handleAutoParse = async () => {
    if (!queryText.trim()) return;
    try {
      const parsed = await parseQuery(queryText);
      setItemName(parsed.item_name);
      setQuantity(parsed.quantity);
      setMaxBudget(parsed.max_budget);
      setDeliveryDays(parsed.delivery_days_limit);
      setShowAdvanced(true);
    } catch (err) {
      console.warn("Auto-parse notice:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      query_text: queryText,
      item_name: itemName,
      quantity: Number(quantity),
      max_budget: Number(maxBudget),
      delivery_days_limit: Number(deliveryDays),
      delivery_city: deliveryCity,
      category: "Packaging & Containers"
    });
  };

  return (
    <div className="glass-panel requirement-card">
      <div className="form-header-bar">
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
            Enter Procurement Requirements
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Tell TinyFish what you need in plain English or refine exact parameters below.
          </p>
        </div>

        <button 
          type="button"
          className="btn-icon-subtle"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          <span>{showAdvanced ? 'Hide Fields' : 'Customize Parameters'}</span>
        </button>
      </div>

      {/* Preset Chips */}
      <div className="presets-container">
        <span className="presets-label">Quick Scenarios:</span>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`preset-chip ${activePreset === p.id ? 'active' : ''}`}
            onClick={() => handlePresetClick(p)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="prompt-box-wrapper">
          <textarea
            id="input-procurement-prompt"
            className="prompt-textarea"
            value={queryText}
            onChange={handleQueryChange}
            placeholder="e.g., I need 5,000 food containers, under ₹20,000, delivered within seven days."
            rows={2}
          />
          <button
            type="submit"
            id="btn-submit-search"
            className="prompt-action-btn"
            disabled={isLoading || !queryText.trim()}
            title="Deploy TinyFish Research Agent"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Advanced Structured Parameters */}
        {showAdvanced && (
          <div className="structured-inputs-grid">
            <div className="field-group">
              <label className="field-label" htmlFor="field-item">
                <Package size={14} /> Product Description
              </label>
              <input
                id="field-item"
                type="text"
                className="field-input"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="field-quantity">
                🔢 Required Quantity (Units)
              </label>
              <input
                id="field-quantity"
                type="number"
                min="100"
                step="100"
                className="field-input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="field-budget">
                <IndianRupee size={14} /> Max Budget (INR)
              </label>
              <input
                id="field-budget"
                type="number"
                min="1000"
                step="500"
                className="field-input"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="field-delivery">
                <Clock size={14} /> Delivery Limit (Days)
              </label>
              <input
                id="field-delivery"
                type="number"
                min="1"
                max="30"
                className="field-input"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
              />
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="field-city">
                <MapPin size={14} /> Destination City
              </label>
              <input
                id="field-city"
                type="text"
                className="field-input"
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
              />
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <Sparkles size={14} color="#10b981" />
            <span>TinyFish Agent visits live supplier portals & calculates verified landed cost.</span>
          </div>

          <button
            type="submit"
            id="btn-deploy-agent"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Wand2 size={18} className="animate-spin" />
                <span>Researching Suppliers...</span>
              </>
            ) : (
              <>
                <Search size={18} />
                <span>Deploy TinyFish Research Agent</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
