import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, AlertTriangle, Cpu, CheckCircle2, Play } from 'lucide-react';

const DEMO_STAGES = [
  {
    id: 'problem',
    stepNumber: '01',
    tabLabel: 'The Hidden Trap',
    tag: 'THE PROBLEM',
    tagType: 'danger',
    title: 'Deceptive Baseline Quotes',
    desc: 'Suppliers advertise tempting low rates online, then spring unquoted freight, concealed 18% GST, and massive 10,000+ unit MOQ hurdles at checkout.',
    stats: [
      { label: 'Advertised Rate', val: '₹2.85/unit', strike: false, color: 'muted' },
      { label: 'Concealed Freight + GST', val: '+ ₹1.29/unit', strike: false, color: 'danger' },
      { label: 'Real Landed Hit', val: '₹4.14/unit', strike: false, color: 'danger', highlight: '+45% Trap' }
    ],
    vaultStatus: 'TRAP DETECTED',
    vaultSymbol: '!',
    vaultGlow: 'danger'
  },
  {
    id: 'engine',
    stepNumber: '02',
    tabLabel: 'TinyFish Audit',
    tag: 'WHAT IT DOES',
    tagType: 'neutral',
    title: 'Autonomous Multi-Tier Audit',
    desc: 'ProcureSaathi deploys AI agents to dissect supplier contracts, locate hidden freight tariffs, and cross-reference artisan guild benchmarks in real time.',
    stats: [
      { label: 'Markets Scanned', val: '3 Major Guilds', strike: false, color: 'primary', highlight: 'Moradabad' },
      { label: 'MOQ Verified', val: 'Under 5,000 units safe', strike: false, color: 'primary' },
      { label: 'Audit Speed', val: '< 1.4 seconds live', strike: false, color: 'primary', highlight: 'Real-time' }
    ],
    vaultStatus: 'DECRYPTING',
    vaultSymbol: '⟳',
    vaultGlow: 'scanning'
  },
  {
    id: 'solution',
    stepNumber: '03',
    tabLabel: 'True Landed Cost',
    tag: 'HOW IT WORKS',
    tagType: 'success',
    title: 'Locked-In Wholesale Clarity',
    desc: 'You receive an immutable, door-delivered rate with ex-factory pricing, all taxes, and freight guaranteed upfront. Dispatched in 1-click RFQ.',
    stats: [
      { label: 'Deceptive Price', val: '₹4.14/unit', strike: true, color: 'muted' },
      { label: 'Direct Guild Rate', val: '₹2.92/unit', strike: false, color: 'success' },
      { label: 'Net MSME Savings', val: '₹12,200 / order', strike: false, color: 'success', highlight: 'Protected' }
    ],
    vaultStatus: 'UNLOCKED',
    vaultSymbol: '₹',
    vaultGlow: 'success'
  }
];

export default function Hero3DParcel({ onScrollDown, onReplayStory }) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance demo stages every 11 seconds (relaxed reading pace) unless user hovers
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % DEMO_STAGES.length);
    }, 11000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 22;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const currentStage = DEMO_STAGES[activeStep];

  return (
    <div className="hero-viewport" ref={containerRef}>
      {/* Subtle Ambient Background Gradient */}
      <div className="hero-ambient-glow" />

      {/* Sleek Minimal Top Navigation */}
      <header className="hero-top-bar">
        <div className="hero-brand">
          <span>PROCURESAATHI</span>
          <span className="hero-brand-badge">B2B TRUTH ENGINE</span>
        </div>
        <div className="hero-top-right-group">
          {onReplayStory && (
            <button
              type="button"
              className="replay-story-pill"
              onClick={onReplayStory}
              title="Watch the full cinematic origin story"
            >
              <Play size={10} fill="#ffffff" />
              <span>Watch Origin Story</span>
            </button>
          )}
          <div className="hero-cluster-tags">
            <span>RAW MATERIALS</span>
            <span className="tag-sep">•</span>
            <span>HANDICRAFTS</span>
            <span className="tag-sep">•</span>
            <span>PACKAGING</span>
          </div>
        </div>
      </header>

      {/* Main Spacious Hero Center */}
      <div className="hero-center-content">
        {/* Left Column: Headline & Interactive Live Intelligence Demo */}
        <div className="hero-text-block">
          <div>
            <h1 className="hero-clean-title">
              True landed cost.<br />
              <span className="hero-title-muted">Zero deception.</span>
            </h1>
            <p className="hero-clean-sub">
              Direct wholesale raw materials & craft procurement. Exposing concealed GST, unquoted freight, and small business MOQ traps upfront.
            </p>
          </div>

          {/* Interactive Dynamic Demo Console */}
          <div 
            className="hero-demo-console"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Minimal Nike-Grade Step Tabs */}
            <div className="demo-tabs-bar">
              {DEMO_STAGES.map((stg, idx) => {
                const isActive = activeStep === idx;
                return (
                  <button
                    key={stg.id}
                    type="button"
                    className={`demo-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveStep(idx)}
                  >
                    <span className="tab-num">{stg.stepNumber}</span>
                    <span className="tab-title">{stg.tabLabel}</span>
                    {isActive && (
                      <div 
                        className="tab-progress-line" 
                        key={`prog-${activeStep}-${isPaused}`} 
                        style={{ 
                          animationDuration: '11s',
                          animationPlayState: isPaused ? 'paused' : 'running'
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Stage Content Panel */}
            <div className="demo-stage-card">
              <div className="stage-card-header">
                <span className={`stage-badge ${currentStage.tagType}`}>
                  {currentStage.tagType === 'danger' && <AlertTriangle size={11} />}
                  {currentStage.tagType === 'neutral' && <Cpu size={11} />}
                  {currentStage.tagType === 'success' && <CheckCircle2 size={11} />}
                  <span>{currentStage.tag}</span>
                </span>
                <span className="stage-headline">{currentStage.title}</span>
              </div>

              <p className="stage-description">
                {currentStage.desc}
              </p>

              {/* Dynamic Metrics Row */}
              <div className="stage-metrics-grid">
                {currentStage.stats.map((st, i) => (
                  <div key={i} className={`metric-box ${st.color}`}>
                    <span className="metric-label">{st.label}</span>
                    <div className="metric-val-row">
                      <span className={`metric-val ${st.strike ? 'strike' : ''}`}>
                        {st.val}
                      </span>
                      {st.highlight && (
                        <span className="metric-pill-badge">{st.highlight}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: The 3D Heavy Bank Vault Combination Safe Wheel */}
        <div 
          className="hero-3d-scene"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            className="vault-mechanism-rig"
            style={{
              transform: `rotateX(${tilt.x - 12}deg) rotateY(${tilt.y + 16}deg)`
            }}
          >
            {/* Layer 0: Heavy Base Door Flange with 12 Perimeter Bolts */}
            <div className="vault-base-flange">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="vault-perimeter-bolt"
                  style={{ transform: `rotate(${i * 30}deg) translateY(-142px)` }}
                />
              ))}
            </div>

            {/* Layer 1: Beveled Chassis Ring with Laser Alignment Cursor */}
            <div className="vault-chassis-bezel">
              <div className="vault-indicator-notch">
                <span className={`notch-arrow ${currentStage.vaultGlow}`}>▲</span>
                <span className={`notch-text ${currentStage.vaultGlow}`}>
                  {currentStage.vaultStatus}
                </span>
              </div>
            </div>

            {/* Layer 2: Rotating Mechanical Calibration Dial */}
            <div className={`vault-rotary-dial ${currentStage.vaultGlow === 'scanning' ? 'speed-up' : ''}`}>
              <svg viewBox="0 0 300 300" className="vault-dial-svg">
                <defs>
                  <path
                    id="vaultDialTrack"
                    d="M 150, 150 m -115, 0 a 115,115 0 1,1 230,0 a 115,115 0 1,1 -230,0"
                    fill="none"
                  />
                  <path
                    id="vaultInnerTrack"
                    d="M 150, 150 m -78, 0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
                    fill="none"
                  />
                </defs>

                {/* Concentric Precision Circles */}
                <circle cx="150" cy="150" r="132" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
                <circle cx="150" cy="150" r="126" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="150" cy="150" r="100" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <circle cx="150" cy="150" r="68" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* 36 Radial Calibration Ticks */}
                {[...Array(36)].map((_, i) => {
                  const angle = (i * 10 * Math.PI) / 180;
                  const isMajor = i % 3 === 0;
                  const r1 = 126;
                  const r2 = isMajor ? 116 : 121;
                  const x1 = 150 + r1 * Math.cos(angle);
                  const y1 = 150 + r1 * Math.sin(angle);
                  const x2 = 150 + r2 * Math.cos(angle);
                  const y2 = 150 + r2 * Math.sin(angle);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isMajor ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)"}
                      strokeWidth={isMajor ? "1.8" : "1"}
                    />
                  );
                })}

                {/* Outer Circular Stage Labels */}
                <text className="vault-svg-text">
                  <textPath href="#vaultDialTrack" startOffset="0%">
                    • EX-FACTORY RATE • FREIGHT AUDITED • GST DISCLOSED • MOQ PROTECTED •
                  </textPath>
                </text>

                {/* Inner Calibration Values */}
                <text className="vault-svg-subtext">
                  <textPath href="#vaultInnerTrack" startOffset="0%">
                    00 • 25 • 50 • 75 • 100 • WHOLESALE PURITY • 2026 •
                  </textPath>
                </text>
              </svg>
            </div>

            {/* Layer 3: Heavy 3D Turning Spoke Wheel (Elevated Handles) */}
            <div className="vault-spoke-layer">
              <div className="vault-spoke spoke-0">
                <span className="spoke-arm" />
                <span className="spoke-handle" />
              </div>
              <div className="vault-spoke spoke-90">
                <span className="spoke-arm" />
                <span className="spoke-handle" />
              </div>
              <div className="vault-spoke spoke-180">
                <span className="spoke-arm" />
                <span className="spoke-handle" />
              </div>
              <div className="vault-spoke spoke-270">
                <span className="spoke-arm" />
                <span className="spoke-handle" />
              </div>
            </div>

            {/* Layer 4: Heavy Machined Center Core Knob */}
            <div className="vault-center-core">
              <div className="core-bevel-ring">
                <div className="core-display">
                  <div className={`core-symbol ${currentStage.vaultGlow}`}>
                    {currentStage.vaultSymbol}
                  </div>
                  <div className="core-status">{currentStage.vaultStatus}</div>
                  <div className="core-tag">0% HIDDEN FEES</div>
                </div>
              </div>
            </div>
          </div>

          {/* Smooth Ground Reflection / Shadow */}
          <div className="vault-ground-shadow" />

          {/* Live Status Pill below 3D Model */}
          <div className="vault-interactive-note">
            <span className="note-indicator" />
            <span>Interactive Safe • Drag mouse to tilt • Step {activeStep + 1} of 3</span>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator Pill */}
      <div className="hero-scroll-trigger" onClick={onScrollDown} role="button" tabIndex={0}>
        <div className="scroll-pill">
          <span className="scroll-dot" />
          <span>Scroll to explore platform & live data</span>
          <ChevronDown size={14} className="scroll-arrow" />
        </div>
      </div>
    </div>
  );
}
