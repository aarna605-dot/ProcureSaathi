import React, { useState } from 'react';
import { 
  Trophy, 
  ShieldCheck, 
  Clock, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  TrendingDown,
  Building2,
  Leaf,
  MessageSquare
} from 'lucide-react';

export default function ComparisonMatrix({ 
  offers, 
  marketBenchmark, 
  currentQuantity, 
  maxBudget,
  deliveryDaysLimit,
  onRecalculate, 
  onInspectOffer, 
  onOpenRFQ 
}) {
  const [sliderQty, setSliderQty] = useState(currentQuantity || 5000);

  if (!offers || offers.length === 0) return null;

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setSliderQty(val);
  };

  const handleSliderRelease = () => {
    if (sliderQty !== currentQuantity) {
      onRecalculate(sliderQty);
    }
  };

  const bestOffer = offers[0];

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Economic Value Banner */}
      <div className="metrics-banner">
        <div className="metric-card">
          <div className="metric-icon-box green">
            <TrendingDown size={24} />
          </div>
          <div>
            <div className="metric-label">Max Potential Savings</div>
            <div className="metric-value">
              ₹{(marketBenchmark.max_potential_savings || 0).toLocaleString('en-IN')}
            </div>
            <div className="metric-sub">
              Saves ₹{(marketBenchmark.savings_vs_market_avg || 0).toLocaleString('en-IN')} vs Market Average
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box indigo">
            <Trophy size={24} />
          </div>
          <div>
            <div className="metric-label">Best Landed Cost (#1)</div>
            <div className="metric-value">
              ₹{bestOffer.cost_breakdown.total_landed_cost.toLocaleString('en-IN')}
            </div>
            <div className="metric-sub" style={{ color: '#818cf8' }}>
              ₹{bestOffer.cost_breakdown.effective_unit_cost.toFixed(2)}/unit (incl. GST & Freight)
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box amber">
            <Building2 size={24} />
          </div>
          <div>
            <div className="metric-label">Supplier Web Coverage</div>
            <div className="metric-value">
              {marketBenchmark.total_suppliers_analyzed || offers.length} Offers
            </div>
            <div className="metric-sub" style={{ color: 'var(--text-secondary)' }}>
              Market Avg: ₹{(marketBenchmark.average_total_cost || 0).toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Bulk Quantity Recalculator Slider */}
      <div className="recalculate-slider-card">
        <div className="slider-info">
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={15} color="#34d399" />
            <span>Simulate Order Volume & Bulk Slabs</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Drag to test different volume tiers (1,000 to 20,000 units)
          </div>
        </div>

        <div className="slider-control-group">
          <input
            id="slider-quantity"
            type="range"
            min="1000"
            max="20000"
            step="500"
            className="slider-input"
            value={sliderQty}
            onChange={handleSliderChange}
            onMouseUp={handleSliderRelease}
            onTouchEnd={handleSliderRelease}
          />
          <div className="slider-val-badge">
            {sliderQty.toLocaleString()} units
          </div>
          {sliderQty !== currentQuantity && (
            <button
              id="btn-apply-qty"
              className="btn-primary"
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
              onClick={handleSliderRelease}
            >
              Update Quotes
            </button>
          )}
        </div>
      </div>

      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
            Verified Supplier Rankings
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Ranked by composite score: Landed cost (40%), Lead time compliance (25%), MOQ feasibility (15%), Trust & Quality (20%).
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="offers-grid">
        {offers.map((offer, idx) => {
          const isTopRank = idx === 0;
          const { cost_breakdown: cb } = offer;
          const isTrap = offer.moq > currentQuantity;
          const isLate = !offer.delivery_deadline_met;

          return (
            <div 
              key={offer.id} 
              id={`offer-card-${offer.id}`}
              className={`offer-card ${isTopRank ? 'rank-1' : ''}`}
            >
              {isTopRank && (
                <div className="badge-winner">
                  <Trophy size={13} />
                  <span>#1 BEST OVERALL VALUE</span>
                </div>
              )}

              {offer.recommendation_badge && !isTopRank && (
                <div style={{ position: 'absolute', top: '-10px', right: '16px', background: 'rgba(99, 102, 241, 0.9)', color: '#fff', padding: '0.2rem 0.65rem', borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 700 }}>
                  {offer.recommendation_badge}
                </div>
              )}

              <div>
                <div className="card-top-row">
                  <div className="supplier-identity">
                    <div className="supplier-title-text">
                      {offer.supplier_name}
                    </div>
                    <div className="supplier-meta-tags">
                      <span className="domain-pill">{offer.source_domain}</span>
                      <span className="rating-badge">★ {offer.supplier_rating.toFixed(1)}</span>
                      {offer.verified_seller && (
                        <span style={{ fontSize: '0.72rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <ShieldCheck size={13} /> Verified
                        </span>
                      )}
                      {offer.biodegradable && (
                        <span style={{ fontSize: '0.72rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <Leaf size={12} /> Eco-Friendly
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                  {offer.product_title}
                </div>

                {/* Landed Cost Highlight */}
                <div className="landed-cost-highlight">
                  <div className="cost-primary-row">
                    <span className="cost-primary-label">Total Landed Cost</span>
                    <span className="cost-primary-val">
                      ₹{cb.total_landed_cost.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="effective-rate-sub">
                    Effective: <strong>₹{cb.effective_unit_cost.toFixed(2)}/unit</strong> • Advertised base: ₹{offer.applicable_unit_price.toFixed(2)}
                  </div>

                  <div className="cost-mini-table">
                    <div className="mini-row">
                      <span>Base Subtotal ({currentQuantity.toLocaleString()} × ₹{offer.applicable_unit_price.toFixed(2)})</span>
                      <span>₹{cb.base_subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="mini-row">
                      <span>GST ({cb.gst_percentage}%)</span>
                      <span>+ ₹{cb.gst_amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="mini-row">
                      <span>Freight Shipping</span>
                      <span>{cb.shipping_cost === 0 ? 'FREE' : `+ ₹${cb.shipping_cost}`}</span>
                    </div>
                  </div>
                </div>

                {/* Delivery & Compliance Pills */}
                <div className="compliance-tags-row">
                  <span className={`comp-pill ${offer.delivery_deadline_met ? 'green' : 'red'}`}>
                    <Clock size={12} />
                    {offer.estimated_delivery_days} Days Lead Time {offer.delivery_deadline_met ? '✓' : '(Exceeds limit)'}
                  </span>

                  <span className={`comp-pill ${isTrap ? 'amber' : 'green'}`}>
                    MOQ: {offer.moq.toLocaleString()} pcs {isTrap ? '⚠️ High' : '✓'}
                  </span>

                  {offer.food_grade_certified && (
                    <span className="comp-pill green">
                      <ShieldCheck size={12} /> Food Grade Certified
                    </span>
                  )}
                </div>

                {/* MOQ Trap alert for deceptive offers */}
                {isTrap && (
                  <div className="risk-alert">
                    <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong>Deceptive Low Price Detected:</strong> Advertised unit rate of ₹{offer.base_unit_price.toFixed(2)} requires a minimum order of {offer.moq.toLocaleString()} units. Ordering your requested {currentQuantity.toLocaleString()} pcs incurs penalty pricing.
                    </div>
                  </div>
                )}

                {/* AI Transparent Verdict Reasoning */}
                <div className="reasoning-box">
                  <div style={{ fontWeight: 700, marginBottom: '0.2rem', color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Sparkles size={13} />
                    <span>AI Procurement Rationale:</span>
                  </div>
                  {offer.verdict_reasoning}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="card-actions-row">
                <button
                  type="button"
                  id={`btn-inspect-${offer.id}`}
                  className="btn-secondary"
                  onClick={() => onInspectOffer(offer)}
                >
                  <Info size={14} />
                  <span>Inspect Evidence</span>
                </button>

                <button
                  type="button"
                  id={`btn-rfq-${offer.id}`}
                  className="btn-whatsapp"
                  onClick={() => onOpenRFQ(offer)}
                >
                  <MessageSquare size={14} />
                  <span>Send RFQ</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-Side Deep Matrix Table */}
      <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2.5rem' }}>
        <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Building2 size={18} color="#34d399" />
          <span>Detailed Side-by-Side Verification Matrix</span>
        </h4>

        <div className="matrix-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Rank & Supplier</th>
                <th>Advertised Unit Price</th>
                <th>GST Rate</th>
                <th>Freight & Shipping</th>
                <th>True Landed Total</th>
                <th>Effective Unit Rate</th>
                <th>Lead Time</th>
                <th>MOQ</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((o) => (
                <tr key={o.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#fff' }}>
                      #{o.rank} {o.supplier_name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {o.source_domain} • ★ {o.supplier_rating.toFixed(1)}
                    </div>
                  </td>
                  <td>
                    <span style={{ textDecoration: o.applicable_unit_price > o.base_unit_price ? 'line-through' : 'none', color: 'var(--text-secondary)' }}>
                      ₹{o.base_unit_price.toFixed(2)}
                    </span>
                    {o.applicable_unit_price > o.base_unit_price && (
                      <span style={{ color: 'var(--amber-400)', marginLeft: '6px', fontWeight: 600 }}>
                        ₹{o.applicable_unit_price.toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td>{o.cost_breakdown.gst_percentage}%</td>
                  <td>
                    {o.cost_breakdown.shipping_cost === 0 ? (
                      <span style={{ color: 'var(--emerald-400)', fontWeight: 600 }}>FREE</span>
                    ) : (
                      `₹${o.cost_breakdown.shipping_cost}`
                    )}
                  </td>
                  <td>
                    <strong style={{ fontSize: '1.05rem', color: '#fff' }}>
                      ₹{o.cost_breakdown.total_landed_cost.toLocaleString('en-IN')}
                    </strong>
                  </td>
                  <td>
                    <span style={{ color: 'var(--emerald-400)', fontWeight: 700 }}>
                      ₹{o.cost_breakdown.effective_unit_cost.toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: o.delivery_deadline_met ? 'inherit' : 'var(--rose-500)', fontWeight: o.delivery_deadline_met ? 400 : 700 }}>
                      {o.estimated_delivery_days} days
                    </span>
                  </td>
                  <td>
                    <span style={{ color: o.moq > currentQuantity ? 'var(--amber-400)' : 'inherit', fontWeight: o.moq > currentQuantity ? 700 : 400 }}>
                      {o.moq.toLocaleString()} pcs
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-icon-subtle"
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                      onClick={() => onInspectOffer(o)}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
