import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import NegotiationModal from './NegotiationModal';
import { 
  Trophy, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  Info, 
  Sparkles, 
  TrendingDown, 
  Building2, 
  Leaf, 
  MessageSquare, 
  Filter, 
  ArrowUpDown,
  RotateCw,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Printer,
  Calculator,
  HandCoins,
  Compass
} from 'lucide-react';

const QUICK_VOLUMES = [1000, 2500, 5000, 10000, 20000];

const CATEGORY_FALLBACK_IMAGES = {
  packaging: [
    "https://images.unsplash.com/photo-1578496781985-452d4a934d50?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600&auto=format&fit=crop&q=80"
  ],
  brass: [
    "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80"
  ],
  textile: [
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&auto=format&fit=crop&q=80"
  ],
  wood: [
    "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&auto=format&fit=crop&q=80"
  ],
  ceramic: [
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=600&auto=format&fit=crop&q=80"
  ]
};

function getProductFallbackImage(offer, idx) {
  if (offer?.product_image) return offer.product_image;
  const title = (offer?.product_title || "").toLowerCase();
  const cat = (offer?.category || "").toLowerCase();

  if (title.includes("brass") || title.includes("hardware") || cat.includes("brass")) {
    const list = CATEGORY_FALLBACK_IMAGES.brass;
    return list[idx % list.length];
  }
  if (title.includes("cotton") || title.includes("canvas") || title.includes("fabric") || cat.includes("textile")) {
    const list = CATEGORY_FALLBACK_IMAGES.textile;
    return list[idx % list.length];
  }
  if (title.includes("wood") || title.includes("timber") || title.includes("sheesham") || cat.includes("wood")) {
    const list = CATEGORY_FALLBACK_IMAGES.wood;
    return list[idx % list.length];
  }
  if (title.includes("ceramic") || title.includes("mug") || title.includes("cup") || cat.includes("ceramic")) {
    const list = CATEGORY_FALLBACK_IMAGES.ceramic;
    return list[idx % list.length];
  }

  const list = CATEGORY_FALLBACK_IMAGES.packaging;
  return list[idx % list.length];
}

export default function ComparisonMatrix({ 
  offers = [], 
  marketBenchmark = {}, 
  currentQuantity = 5000, 
  deliveryDaysLimit = 7,
  onRecalculate, 
  onInspectOffer, 
  onOpenRFQ 
}) {
  const [sliderQty, setSliderQty] = useState(currentQuantity);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'price_asc', 'delivery_asc', 'rating_desc'
  const [filterEco, setFilterEco] = useState(false);
  const [filterDeadline, setFilterDeadline] = useState(false);
  const [filterVerified, setFilterVerified] = useState(false);
  const [viewMode, setViewMode] = useState('dial'); // 'dial' | 'grid'
  const [dialIdx, setDialIdx] = useState(0);
  const [negotiatingOffer, setNegotiatingOffer] = useState(null);

  // Profit Margin & Resale Simulator State
  const [showMarginSim, setShowMarginSim] = useState(true);
  const [targetResalePrice, setTargetResalePrice] = useState(18); // default ₹18.00 per unit

  // Filter and sort offers unconditionally before any returns
  const processedOffers = useMemo(() => {
    if (!offers || offers.length === 0) return [];
    let result = [...offers];

    if (filterEco) {
      result = result.filter(o => o.biodegradable);
    }
    if (filterDeadline) {
      result = result.filter(o => o.delivery_deadline_met);
    }
    if (filterVerified) {
      result = result.filter(o => o.verified_seller);
    }

    if (sortBy === 'price_asc') {
      result.sort((a, b) => a.cost_breakdown.total_landed_cost - b.cost_breakdown.total_landed_cost);
    } else if (sortBy === 'delivery_asc') {
      result.sort((a, b) => a.estimated_delivery_days - b.estimated_delivery_days);
    } else if (sortBy === 'rating_desc') {
      result.sort((a, b) => b.supplier_rating - a.supplier_rating);
    } else {
      result.sort((a, b) => (b.composite_score || 0) - (a.composite_score || 0));
    }

    return result;
  }, [offers, filterEco, filterDeadline, filterVerified, sortBy]);

  // Rotary Dial Tick Audio FX
  const playDialTick = useCallback(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio fallback safe
    }
  }, []);

  const rotateTo = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, processedOffers.length - 1));
    if (clamped !== dialIdx) {
      playDialTick();
      setDialIdx(clamped);
    }
  }, [dialIdx, processedOffers.length, playDialTick]);

  // Stage Mousewheel Event Handler (turns dial smoothly)
  const wheelDebounceRef = useRef(0);
  const handleStageWheel = useCallback((e) => {
    const now = Date.now();
    if (now - wheelDebounceRef.current < 220) return;
    if (Math.abs(e.deltaY) > 15 || Math.abs(e.deltaX) > 15) {
      wheelDebounceRef.current = now;
      if (e.deltaY > 0 || e.deltaX > 0) {
        rotateTo(dialIdx + 1);
      } else {
        rotateTo(dialIdx - 1);
      }
    }
  }, [dialIdx, rotateTo]);

  // Touch Swipe Handlers for mobile rotary dial
  const touchStartXRef = useRef(null);
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 40) rotateTo(dialIdx + 1);
    else if (diff < -40) rotateTo(dialIdx - 1);
    touchStartXRef.current = null;
  };

  // Keyboard Navigation for dial
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (negotiatingOffer) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        rotateTo(dialIdx + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        rotateTo(dialIdx - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dialIdx, rotateTo, negotiatingOffer]);

  if (!offers || offers.length === 0) return null;

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setSliderQty(val);
  };

  const handleSliderRelease = (qtyToApply) => {
    const target = qtyToApply ?? sliderQty;
    if (target !== currentQuantity) {
      onRecalculate(target);
    }
  };

  const handlePrintDossier = (offerToPrint) => {
    const orig = document.title;
    document.title = `ProcureSaathi_Quotation_Dossier_${offerToPrint ? offerToPrint.supplier_name.replace(/\s+/g, '_') : 'Comparison'}`;
    window.print();
    setTimeout(() => {
      document.title = orig;
    }, 1000);
  };

  const handleQuickVolumeClick = (vol) => {
    setSliderQty(vol);
    handleSliderRelease(vol);
  };

  const bestOffer = offers[0];

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Economic Value Banner (Monochrome Minimalist) */}
      <div className="metrics-banner">
        <div className="metric-card">
          <div className="metric-icon-box">
            <TrendingDown size={22} />
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
          <div className="metric-icon-box">
            <Trophy size={22} />
          </div>
          <div>
            <div className="metric-label">Best Landed Cost</div>
            <div className="metric-value">
              ₹{bestOffer?.cost_breakdown?.total_landed_cost ? bestOffer.cost_breakdown.total_landed_cost.toLocaleString('en-IN') : '0'}
            </div>
            <div className="metric-sub">
              ₹{bestOffer?.cost_breakdown?.effective_unit_cost ? bestOffer.cost_breakdown.effective_unit_cost.toFixed(2) : '0'}/unit all-inclusive
            </div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-box">
            <Building2 size={22} />
          </div>
          <div>
            <div className="metric-label">Supplier Web Coverage</div>
            <div className="metric-value">
              {marketBenchmark.total_suppliers_analyzed || offers.length} Sources
            </div>
            <div className="metric-sub">
              Market Avg: ₹{(marketBenchmark.average_total_cost || 0).toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Bulk Quantity Recalculator Slider */}
      <div className="recalculate-slider-card">
        <div className="slider-info">
          <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={16} color="#059669" />
            <span>Interactive Order Volume Simulator</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Adjust quantity to reveal bulk volume discounts & expose MOQ penalty traps:
          </div>
          
          <div className="quick-qty-pills" style={{ marginTop: '0.65rem' }}>
            {QUICK_VOLUMES.map(vol => (
              <button
                key={vol}
                type="button"
                className={`qty-preset-btn ${sliderQty === vol ? 'active' : ''}`}
                onClick={() => handleQuickVolumeClick(vol)}
              >
                {vol >= 1000 ? `${vol / 1000}k` : vol}
              </button>
            ))}
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
            onMouseUp={() => handleSliderRelease()}
            onTouchEnd={() => handleSliderRelease()}
          />
          <div className="slider-val-badge">
            {sliderQty.toLocaleString()} units
          </div>
          {sliderQty !== currentQuantity && (
            <button
              id="btn-apply-qty"
              className="btn-primary"
              style={{ padding: '0.45rem 1rem', fontSize: '0.82rem' }}
              onClick={() => handleSliderRelease()}
            >
              Update Quotes
            </button>
          )}
        </div>
      </div>

      {/* Interactive Retail Profit Margin & Cash Flow Simulator */}
      {showMarginSim && (() => {
        const activeOfferForSim = processedOffers[dialIdx] || processedOffers[0];
        const unitLandedCost = activeOfferForSim?.cost_breakdown?.effective_unit_cost || activeOfferForSim?.applicable_unit_price || 3.39;
        const totalOrderLanded = activeOfferForSim?.cost_breakdown?.total_landed_cost || (unitLandedCost * currentQuantity);
        const grossMarginPerUnit = targetResalePrice - unitLandedCost;
        const marginPercent = targetResalePrice > 0 ? (grossMarginPerUnit / targetResalePrice) * 100 : 0;
        const totalGrossProfit = Math.round(grossMarginPerUnit * currentQuantity);
        const breakEvenUnits = targetResalePrice > 0 ? Math.ceil(totalOrderLanded / targetResalePrice) : 0;
        const breakEvenPercent = Math.min(100, Math.max(1, Math.round((breakEvenUnits / currentQuantity) * 100)));

        return (
          <div className="margin-sim-panel">
            <div className="margin-sim-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  <Calculator size={16} color="#059669" />
                  <span>Unit Profit Margin & Resale Cash Flow Simulator</span>
                  <span style={{ fontSize: '0.72rem', background: '#ecfdf5', color: '#059669', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontWeight: 700 }}>
                    Dialed: {activeOfferForSim.supplier_name}
                  </span>
                  <button
                    type="button"
                    className="btn-icon-subtle"
                    style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', marginLeft: '0.5rem' }}
                    onClick={() => setShowMarginSim(false)}
                    title="Hide Margin Simulator"
                  >
                    Hide
                  </button>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  Simulate your retail selling price to project net margins and order break-even recovery:
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Target Selling Price:
                </span>
                <div style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', border: '1px solid var(--border-medium)', borderRadius: '8px', padding: '0.25rem 0.6rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', marginRight: '2px' }}>₹</span>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    step="0.5"
                    value={targetResalePrice}
                    onChange={(e) => setTargetResalePrice(Math.max(1, Number(e.target.value)))}
                    style={{ width: '60px', background: 'transparent', border: 'none', outline: 'none', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/unit</span>
                </div>
              </div>
            </div>

            <div className="margin-grid-metrics">
              <div className="margin-metric-box">
                <span className="margin-metric-label">Landed Purchase Cost</span>
                <span className="margin-metric-val">₹{unitLandedCost.toFixed(2)}</span>
                <span className="margin-metric-sub">All-inclusive per unit</span>
              </div>

              <div className="margin-metric-box highlight">
                <span className="margin-metric-label">Net Gross Margin</span>
                <span className="margin-metric-val">{marginPercent.toFixed(1)}%</span>
                <span className="margin-metric-sub">₹{grossMarginPerUnit.toFixed(2)} profit / unit</span>
              </div>

              <div className="margin-metric-box highlight">
                <span className="margin-metric-label">Total Batch Gross Profit</span>
                <span className="margin-metric-val">₹{totalGrossProfit.toLocaleString('en-IN')}</span>
                <span className="margin-metric-sub">On {currentQuantity.toLocaleString()} units</span>
              </div>

              <div className="margin-metric-box">
                <span className="margin-metric-label">Break-Even Sales</span>
                <span className="margin-metric-val">{breakEvenUnits.toLocaleString('en-IN')} units</span>
                <span className="margin-metric-sub">{breakEvenPercent}% of order recovers spend</span>
              </div>
            </div>

            <div className="margin-progress-track">
              <div 
                className="margin-progress-fill" 
                style={{ width: `${breakEvenPercent}%` }}
                title={`Break-Even Point: ${breakEvenUnits} units (${breakEvenPercent}%)`}
              />
              <div 
                className="margin-progress-surplus" 
                style={{ width: `${Math.max(0, 100 - breakEvenPercent)}%` }}
                title={`Pure Profit Zone: ${currentQuantity - breakEvenUnits} units (${100 - breakEvenPercent}%)`}
              />
            </div>
          </div>
        );
      })()}

      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
            Verified Supplier Rankings
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Ranked by composite score: Landed Cost (40%), Delivery Compliance (25%), MOQ Feasibility (15%), Trust & Quality (20%).
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {!showMarginSim && (
            <button
              type="button"
              className="btn-icon-subtle"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              onClick={() => setShowMarginSim(true)}
              title="Show Resale Margin Simulator"
            >
              <Calculator size={13} color="#059669" />
              <span>Resale Simulator</span>
            </button>
          )}

          <button
            type="button"
            className="btn-print-dossier"
            onClick={() => handlePrintDossier(null)}
            title="Print formal B2B comparison dossier"
          >
            <Printer size={13} />
            <span>Print Dossier</span>
          </button>

          <span style={{ fontSize: '0.82rem', color: '#059669', background: '#ecfdf5', padding: '0.35rem 0.75rem', borderRadius: '9999px', border: '1px solid rgba(5, 150, 105, 0.2)', fontWeight: 600 }}>
            Showing {processedOffers.length} of {offers.length} candidate offers
          </span>
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="filter-sort-toolbar">
        <div className="filter-group">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
            <Filter size={13} />
            <span>Filters:</span>
          </span>

          <button
            type="button"
            className={`filter-pill-btn ${filterEco ? 'active' : ''}`}
            onClick={() => setFilterEco(!filterEco)}
          >
            <Leaf size={12} />
            <span>Eco-Friendly Only</span>
          </button>

          <button
            type="button"
            className={`filter-pill-btn ${filterDeadline ? 'active' : ''}`}
            onClick={() => setFilterDeadline(!filterDeadline)}
          >
            <Clock size={12} />
            <span>Within Delivery Limit (≤ {deliveryDaysLimit}d)</span>
          </button>

          <button
            type="button"
            className={`filter-pill-btn ${filterVerified ? 'active' : ''}`}
            onClick={() => setFilterVerified(!filterVerified)}
          >
            <ShieldCheck size={12} />
            <span>Verified Sellers</span>
          </button>

          {(filterEco || filterDeadline || filterVerified) && (
            <button
              type="button"
              className="btn-icon-subtle"
              style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}
              onClick={() => {
                setFilterEco(false);
                setFilterDeadline(false);
                setFilterVerified(false);
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600 }}>
              <ArrowUpDown size={13} />
              <span>Sort:</span>
            </span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">AI Recommended Score</option>
              <option value="price_asc">Lowest Landed Cost (₹)</option>
              <option value="delivery_asc">Fastest Delivery Lead Time</option>
              <option value="rating_desc">Highest Seller Rating (★)</option>
            </select>
          </div>

          {/* View Mode Toggle: 3D Rotary Dial vs Multi-column Grid */}
          <div className="view-mode-toggle-group">
            <button
              type="button"
              className={`view-mode-btn ${viewMode === 'dial' ? 'active' : ''}`}
              onClick={() => setViewMode('dial')}
              title="Interactive 3D Rotary Dial Showcase (No horizontal scroll)"
            >
              <RotateCw size={13} />
              <span>3D Rotary Dial</span>
            </button>
            <button
              type="button"
              className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Multi-column Grid View"
            >
              <LayoutGrid size={13} />
              <span>Grid View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render Offer Card Content Helper */}
      {(() => {
        const renderOfferCard = (offer, idx) => {
          const isTopRank = offer.rank === 1 || (sortBy === 'recommended' && idx === 0);
          const { cost_breakdown: cb } = offer;
          const isTrap = offer.moq > currentQuantity;
          const imgSrc = getProductFallbackImage(offer, idx);

          // Kinetic Circular Typography Stamp - dynamically reflects offer audit status
          let stampText = '• VERIFIED LANDED COST • AUDITED RATE • 2026 •';
          let coreIcon = '✓';
          if (isTopRank) {
            stampText = '• VERIFIED LANDED COST • BEST VALUE • 2026 •';
            coreIcon = '★';
          } else if (offer.recommendation_badge) {
            stampText = `• VERIFIED LANDED COST • ${offer.recommendation_badge.toUpperCase()} • 2026 •`;
            const bLower = offer.recommendation_badge.toLowerCase();
            coreIcon = bLower.includes('fast') ? '⚡' : bLower.includes('eco') ? '🍃' : '★';
          } else if (isTrap) {
            stampText = '• MOQ HURDLE DETECTED • HIGH VOLUME REQUIRED •';
            coreIcon = '!';
          }

          // Donut wheel cost proportions
          const totalCost = cb.total_landed_cost || 1;
          const basePct = Math.round((cb.base_subtotal / totalCost) * 100);
          const gstPct = Math.round((cb.gst_amount / totalCost) * 100);
          const freightPct = Math.max(0, 100 - basePct - gstPct);

          return (
            <div 
              key={offer.id} 
              id={`offer-card-${offer.id}`}
              className={`offer-card ${isTopRank ? 'rank-1' : ''}`}
            >
              {isTopRank && (
                <div className="badge-winner">
                  <span>Best Value</span>
                </div>
              )}

              {offer.recommendation_badge && !isTopRank && (
                <div className="badge-secondary-rec">
                  {offer.recommendation_badge}
                </div>
              )}

              {/* Product Visual Stage with Kinetic Typography Spinning Stamp */}
              <div className="product-image-stage">
                <img 
                  src={imgSrc} 
                  alt={offer.product_title} 
                  className="product-tile-photo"
                  loading="lazy" 
                />
                <div className="product-photo-gradient-overlay" />

                {/* Kinetic Circular Typography Stamp - dynamically reflects offer status */}
                <div className="spinning-wheel-stamp" title={`ProcureSaathi Audit: ${offer.recommendation_badge || (isTopRank ? 'Best Value' : 'Verified Landed Cost')}`}>
                  <svg viewBox="0 0 100 100" className="wheel-svg">
                    <path
                      id={`circlePath-${offer.id}`}
                      d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                      fill="none"
                    />
                    <text className="wheel-text">
                      <textPath href={`#circlePath-${offer.id}`} startOffset="0%">
                        {stampText}
                      </textPath>
                    </text>
                  </svg>
                  <div className="wheel-center-core">
                    <span className="wheel-core-star">{coreIcon}</span>
                  </div>
                </div>

                <div className="photo-domain-tag">
                  {offer.source_domain}
                </div>
              </div>

              <div className="card-body-content">
                <div className="card-top-row">
                  <div className="supplier-identity">
                    <div className="supplier-title-text">
                      {offer.supplier_name}
                    </div>
                    <div className="supplier-meta-tags">
                      <span className="rating-badge">★ {offer.supplier_rating.toFixed(1)}</span>
                      {offer.verified_seller && (
                        <span className="seller-status-verified">
                          <ShieldCheck size={13} /> GST Verified
                        </span>
                      )}
                      {offer.biodegradable && (
                        <span className="seller-status-eco">
                          <Leaf size={12} /> Eco-Friendly
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="product-title-sub">
                  {offer.product_title}
                </div>

                {/* Landed Cost Highlight with Donut Cost Wheel */}
                <div className="landed-cost-highlight">
                  <div className="cost-highlight-top">
                    <div>
                      <span className="cost-primary-label">Verified Landed Cost</span>
                      <div className="cost-primary-val">
                        ₹{cb.total_landed_cost.toLocaleString('en-IN', { minimumFractionDigits: 0 })}
                      </div>
                    </div>

                    {/* Cost Breakdown Donut Wheel */}
                    <div 
                      className="cost-donut-wheel" 
                      style={{ position: 'relative', width: 42, height: 42, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                      title={`Breakdown: Base ₹${cb.base_subtotal.toLocaleString()} (${basePct}%) | GST ₹${cb.gst_amount.toLocaleString()} (${gstPct}%) | Freight ₹${cb.shipping_cost.toLocaleString()} (${freightPct}%)`}
                    >
                      <svg 
                        viewBox="0 0 36 36" 
                        width="42" 
                        height="42" 
                        style={{ width: '42px', height: '42px', flexShrink: 0, transform: 'rotate(-90deg)' }}
                        className="donut-svg"
                      >
                        <circle className="donut-bg" cx="18" cy="18" r="15.915" fill="none" stroke="#E5E7EB" strokeWidth="3.5" />
                        <circle 
                          className="donut-segment base" 
                          cx="18" cy="18" r="15.915" 
                          fill="none"
                          stroke="#111827"
                          strokeWidth="3.5"
                          strokeDasharray={`${basePct} ${100 - basePct}`} 
                          strokeDashoffset="25" 
                        />
                        <circle 
                          className="donut-segment gst" 
                          cx="18" cy="18" r="15.915" 
                          fill="none"
                          stroke="#6B7280"
                          strokeWidth="3.5"
                          strokeDasharray={`${gstPct} ${100 - gstPct}`} 
                          strokeDashoffset={`${25 - basePct}`} 
                        />
                        {freightPct > 0 && (
                          <circle 
                            className="donut-segment freight" 
                            cx="18" cy="18" r="15.915" 
                            fill="none"
                            stroke="#9CA3AF"
                            strokeWidth="3.5"
                            strokeDasharray={`${freightPct} ${100 - freightPct}`} 
                            strokeDashoffset={`${25 - basePct - gstPct}`} 
                          />
                        )}
                      </svg>
                      <div 
                        className="donut-center-dot"
                        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-primary)', pointerEvents: 'none' }}
                      >
                        <span>₹</span>
                      </div>
                    </div>
                  </div>

                  <div className="effective-rate-sub">
                    <span>Effective: <strong>₹{cb.effective_unit_cost.toFixed(2)}/unit</strong></span>
                    <span className="bullet-sep">•</span>
                    <span>Advertised: <span style={{ textDecoration: offer.applicable_unit_price > offer.base_unit_price ? 'line-through' : 'none' }}>₹{offer.base_unit_price.toFixed(2)}</span></span>
                  </div>

                  <div className="cost-mini-table">
                    <div className="mini-row">
                      <span>Base subtotal ({currentQuantity.toLocaleString()} × ₹{offer.applicable_unit_price.toFixed(2)})</span>
                      <span style={{ fontWeight: 600 }}>₹{cb.base_subtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="mini-row">
                      <span>GST surcharge ({cb.gst_percentage}%)</span>
                      <span style={{ color: 'var(--text-primary)' }}>+₹{cb.gst_amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="mini-row">
                      <span>Logistics freight</span>
                      <span style={{ fontWeight: 600 }}>
                        {cb.shipping_cost === 0 ? 'Free' : `+₹${cb.shipping_cost}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery & Compliance Pills (Monochrome) */}
                <div className="compliance-tags-row">
                  <span className="comp-pill mono">
                    <Clock size={12} />
                    {offer.estimated_delivery_days} days delivery
                  </span>

                  <span className={`comp-pill ${isTrap ? 'mono-dark' : 'mono'}`}>
                    Minimum order: {offer.moq.toLocaleString()} units {isTrap ? '(High MOQ)' : ''}
                  </span>

                  {offer.food_grade_certified && (
                    <span className="comp-pill mono">
                      <ShieldCheck size={12} /> FSSAI food grade
                    </span>
                  )}
                </div>

                {/* MOQ Trap alert for deceptive offers (Monochrome Minimalist) */}
                {isTrap && (
                  <div className="risk-alert mono-alert">
                    <AlertTriangle size={15} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--text-primary)' }} />
                    <div>
                      <strong>MOQ requirement:</strong> Headline rate of ₹{offer.base_unit_price.toFixed(2)} requires ordering {offer.moq.toLocaleString()} units. For {currentQuantity.toLocaleString()} units, standard sub-lot pricing of ₹{offer.applicable_unit_price.toFixed(2)}/unit applies.
                    </div>
                  </div>
                )}

                {/* Recommendation Note */}
                <div className="reasoning-box">
                  <div className="reasoning-title">
                    Recommendation note
                  </div>
                  {offer.verdict_reasoning}
                </div>
              </div>

              {/* Unified Spacious Card Footer */}
              <div className="card-footer-actions">
                <div className="card-actions-primary-row">
                  <button
                    type="button"
                    id={`btn-rfq-${offer.id}`}
                    className="btn-whatsapp"
                    onClick={() => onOpenRFQ(offer)}
                    title="Generate 1-click WhatsApp RFQ quotation"
                  >
                    <MessageSquare size={15} />
                    <span>Contact on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    id={`btn-inspect-${offer.id}`}
                    className="btn-secondary"
                    onClick={() => onInspectOffer(offer)}
                    title="Inspect landed cost waterfall & live scraped evidence"
                  >
                    <Info size={14} />
                    <span>Evidence</span>
                  </button>
                </div>

                <div className="card-actions-secondary-row">
                  <button
                    type="button"
                    className="btn-counter-offer"
                    onClick={() => setNegotiatingOffer(offer)}
                    title="Generate a strategic data-backed counter-offer"
                  >
                    <HandCoins size={13} color="#059669" />
                    <span>Negotiate Quote</span>
                  </button>

                  <button
                    type="button"
                    className="btn-print-dossier"
                    onClick={() => handlePrintDossier(offer)}
                    title="Print formal B2B quotation dossier"
                  >
                    <Printer size={13} />
                    <span>Dossier</span>
                  </button>
                </div>
              </div>
            </div>
          );
        };

        if (viewMode === 'dial') {
          const dialAngle = processedOffers.length > 1 
            ? (dialIdx / (processedOffers.length - 1)) * 140 - 70 
            : 0;
          const activeOffer = processedOffers[dialIdx] || processedOffers[0];

          return (
            <div className="dial-showcase-container">
              {/* Top Rotary Dial Controller HUD */}
              <div className="rotary-dial-header">
                <div className="dial-controls-bar">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="dial-rotary-knob-wrapper">
                      {/* Physical Rotary Dial Knob Visual */}
                      <div 
                        className="dial-knob-visual"
                        title="Rotary Dial: Scroll or drag to switch suppliers"
                      >
                        <svg viewBox="0 0 60 60" className="dial-knob-svg">
                          {/* Outer Dial Ring */}
                          <circle cx="30" cy="30" r="28" fill="#111827" stroke="#374151" strokeWidth="2" />
                          {/* Graduation Notches */}
                          {[...Array(12)].map((_, i) => (
                            <line
                              key={i}
                              x1="30"
                              y1="4"
                              x2="30"
                              y2="7"
                              stroke={i % 3 === 0 ? '#ffffff' : '#6b7280'}
                              strokeWidth={i % 3 === 0 ? "2" : "1"}
                              transform={`rotate(${i * 30} 30 30)`}
                            />
                          ))}
                          {/* Rotating Center Knob */}
                          <g transform={`rotate(${dialAngle} 30 30)`} style={{ transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                            <circle cx="30" cy="30" r="18" fill="#1f2937" stroke="#4b5563" strokeWidth="1.5" />
                            {/* Dial Needle Indicator */}
                            <line x1="30" y1="30" x2="30" y2="15" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="30" cy="30" r="4" fill="#ffffff" />
                          </g>
                        </svg>
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            ROTARY DIAL CONTROL
                          </span>
                          <span style={{ fontSize: '0.68rem', background: '#111827', color: '#ffffff', padding: '0.15rem 0.45rem', borderRadius: '4px', fontWeight: 700 }}>
                            3D ACTIVE
                          </span>
                        </div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--text-primary)' }}>
                          {activeOffer.supplier_name}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <button
                        type="button"
                        className="dial-stepper-btn"
                        onClick={() => rotateTo(dialIdx - 1)}
                        disabled={dialIdx === 0}
                        aria-label="Previous supplier dial step"
                      >
                        <ChevronLeft size={16} />
                        <span>Prev</span>
                      </button>
                      <button
                        type="button"
                        className="dial-stepper-btn"
                        onClick={() => rotateTo(dialIdx + 1)}
                        disabled={dialIdx >= processedOffers.length - 1}
                        aria-label="Next supplier dial step"
                      >
                        <span>Next</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Compass size={14} />
                    <span>Scroll mousewheel or use ← / → keys to turn dial</span>
                  </div>
                </div>

                {/* Direct Stepped Notches Bar */}
                <div className="dial-notches-row">
                  {processedOffers.map((off, i) => {
                    const isActive = dialIdx === i;
                    return (
                      <button
                        key={off.id}
                        type="button"
                        className={`dial-notch-pill ${isActive ? 'active' : ''}`}
                        onClick={() => rotateTo(i)}
                      >
                        <span className="dial-notch-indicator" />
                        <span>0{i + 1}: {off.supplier_name.split(' ')[0]}</span>
                        {off.recommendation_badge && (
                          <span style={{ fontSize: '0.68rem', opacity: 0.85 }}>• {off.recommendation_badge}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3D Cylindrical Dial Stage (No Horizontal Scrollbar!) */}
              <div 
                className="dial-3d-stage"
                onWheel={handleStageWheel}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {processedOffers.map((offer, idx) => {
                  const diff = idx - dialIdx;
                  let positionClass = 'hidden-card';
                  if (diff === 0) positionClass = 'center-card';
                  else if (diff === -1) positionClass = 'left-card';
                  else if (diff === 1) positionClass = 'right-card';

                  return (
                    <div 
                      key={offer.id}
                      className={`dial-card-wrapper ${positionClass}`}
                      onClick={() => {
                        if (diff === -1) rotateTo(dialIdx - 1);
                        else if (diff === 1) rotateTo(dialIdx + 1);
                      }}
                    >
                      {renderOfferCard(offer, idx)}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        return (
          <div className="offers-grid">
            {processedOffers.map((offer, idx) => renderOfferCard(offer, idx))}
          </div>
        );
      })()}

      {/* Side-by-Side Deep Matrix Table */}
      <div className="glass-panel" style={{ padding: '1.75rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Building2 size={18} color="var(--text-primary)" />
            <span>Side-by-Side Verification Matrix</span>
          </h4>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Direct comparison of base prices, taxes, logistics, and total landed costs
          </span>
        </div>

        <div className="matrix-container" style={{ marginTop: 0 }}>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Rank & Supplier</th>
                <th>Advertised Headline</th>
                <th>GST Rate</th>
                <th>Logistics Freight</th>
                <th>True Landed Total</th>
                <th>Effective Unit Rate</th>
                <th>Lead Time</th>
                <th>MOQ Feasibility</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {processedOffers.map((o) => (
                <tr key={o.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
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
                      <span style={{ color: 'var(--text-primary)', marginLeft: '6px', fontWeight: 600 }}>
                        ₹{o.applicable_unit_price.toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td>{o.cost_breakdown.gst_percentage}%</td>
                  <td>
                    {o.cost_breakdown.shipping_cost === 0 ? (
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>FREE</span>
                    ) : (
                      `₹${o.cost_breakdown.shipping_cost}`
                    )}
                  </td>
                  <td>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                      ₹{o.cost_breakdown.total_landed_cost.toLocaleString('en-IN')}
                    </strong>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>
                      ₹{o.cost_breakdown.effective_unit_cost.toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                      {o.estimated_delivery_days} days {!o.delivery_deadline_met && '(Delayed)'}
                    </span>
                  </td>
                  <td>
                    <span style={{ color: 'var(--text-primary)', fontWeight: o.moq > currentQuantity ? 600 : 500 }}>
                      {o.moq.toLocaleString()} pcs {o.moq > currentQuantity && '(High MOQ)'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-icon-subtle"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
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

      {/* Strategic B2B Negotiation & Counter-Offer Modal */}
      {negotiatingOffer && (
        <NegotiationModal
          offer={negotiatingOffer}
          allOffers={processedOffers}
          currentQuantity={currentQuantity}
          onClose={() => setNegotiatingOffer(null)}
        />
      )}
    </div>
  );
}
