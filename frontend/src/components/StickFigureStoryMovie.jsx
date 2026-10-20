import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  X, 
  ArrowRight, 
  RotateCcw
} from 'lucide-react';

export default function StickFigureStoryMovie({ onComplete }) {
  // Movie timeline in seconds (total 24 seconds, 6s per act)
  const [movieTime, setMovieTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isEnding, setIsEnding] = useState(false);

  const audioCtxRef = useRef(null);
  const playedSfxRef = useRef({});

  const TOTAL_DURATION = 24.0;

  // Studio Sound Synthesizer for Minimalist Monochrome Animation FX
  const playSfx = useCallback((type) => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;

      if (type === 'ring') {
        // Minimalist telephone ring tone
        [800, 850].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.025, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.32);
        });
      } else if (type === 'jump') {
        // Subtle affirmative click tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.16);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'truck') {
        // Deep logistics transporter low tone
        [120, 160].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);
          osc.frequency.linearRampToValueAtTime(freq * 0.95, now + 0.3);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.3);
        });
      } else if (type === 'air_brake') {
        // Transporter air-brake hiss
        const bufferSize = ctx.sampleRate * 0.22;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.08));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1600, now);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      } else if (type === 'invoice_slam') {
        // Sub-bass impact thud
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.exponentialRampToValueAtTime(28, now + 0.35);
        gain.gain.setValueAtTime(0.24, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'gasp') {
        // Dramatic low drone shock chord
        [220, 261.6, 329.6].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);
          osc.frequency.linearRampToValueAtTime(freq * 0.9, now + 0.55);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.55);
        });
      } else if (type === 'solution_impact') {
        // Crisp resolution chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.7);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.7);
      }
    } catch {
      // Audio fallback safe
    }
  }, [isMuted]);

  // Finish video & smoothly unveil platform solution
  const handleCutToSolution = useCallback(() => {
    playSfx('solution_impact');
    setIsEnding(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  }, [onComplete, playSfx]);

  // Main 60fps movie playback loop
  useEffect(() => {
    if (!isPlaying || isEnding) return;

    let lastTime = performance.now();
    let animId;

    const tick = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      setMovieTime((prev) => {
        const next = prev + delta;

        // Trigger SFX at exact timeline moments
        if (next >= 0.5 && !playedSfxRef.current['ring1']) {
          playedSfxRef.current['ring1'] = true;
          playSfx('ring');
        }
        if (next >= 3.5 && !playedSfxRef.current['jump']) {
          playedSfxRef.current['jump'] = true;
          playSfx('jump');
        }
        if (next >= 6.2 && !playedSfxRef.current['truck']) {
          playedSfxRef.current['truck'] = true;
          playSfx('truck');
        }
        if (next >= 8.5 && !playedSfxRef.current['air_brake']) {
          playedSfxRef.current['air_brake'] = true;
          playSfx('air_brake');
        }
        if (next >= 12.0 && !playedSfxRef.current['slam']) {
          playedSfxRef.current['slam'] = true;
          playSfx('invoice_slam');
        }
        if (next >= 17.5 && !playedSfxRef.current['gasp']) {
          playedSfxRef.current['gasp'] = true;
          playSfx('gasp');
        }

        // When 24 seconds reached, cut directly to platform solution
        if (next >= TOTAL_DURATION) {
          handleCutToSolution();
          return TOTAL_DURATION;
        }

        return next;
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, isEnding, playSfx, handleCutToSolution]);

  // Reset movie
  const handleRestart = () => {
    playedSfxRef.current = {};
    setMovieTime(0);
    setIsPlaying(true);
  };

  // Timeline phases (6s per act)
  const isPhase1 = movieTime < 5.8;
  const isPhase2 = movieTime >= 5.8 && movieTime < 11.5;
  const isPhase3 = movieTime >= 11.5 && movieTime < 17.5;
  const isPhase4 = movieTime >= 17.5;

  // Animation values
  const rameshHop = isPhase1 && movieTime > 3.2 ? Math.abs(Math.sin(movieTime * 12)) * 18 : 0;
  const rameshBreathe = Math.sin(movieTime * 3) * 1.2;
  const isBlinking = Math.sin(movieTime * 3.8) > 0.94;
  
  // Transporter motion & suspension recoil physics
  const truckX = isPhase2 ? Math.min(680, 1200 - (movieTime - 5.8) * 160) : (movieTime >= 11.5 ? 680 : 1300);
  const truckWheelRot = (truckX * 2.2) % 360;
  const truckBounce = (movieTime > 8.4 && movieTime < 9.6) 
    ? Math.sin((movieTime - 8.4) * 14) * Math.exp(-(movieTime - 8.4) * 4) * 6 
    : 0;

  const driverStep = isPhase2 && movieTime > 8.5 ? Math.min(1, (movieTime - 8.5) / 1.8) : (movieTime >= 11.5 ? 1 : 0);
  const scrollUnroll = isPhase3 ? Math.min(240, (movieTime - 11.5) * 90) : (movieTime >= 17.5 ? 240 : 0);
  const stampImpact = isPhase3 && scrollUnroll >= 190 ? Math.min(1, (scrollUnroll - 190) / 25) : 0;

  return (
    <div className={`cartoon-movie-overlay ${isEnding ? 'cartoon-exit-shatter' : ''}`}>
      {/* Studio Top Header HUD - Pure Minimalist Monochrome */}
      <div className="cartoon-header-hud">
        <div className="hud-title-group">
          <span className="cartoon-badge">ORIGIN STORY</span>
          <span className="hud-headline">
            {isPhase1 && 'ACT 01 • THE "DISCOUNTED" QUOTATION'}
            {isPhase2 && 'ACT 02 • THE CONSIGNMENT ARRIVES'}
            {isPhase3 && 'ACT 03 • THE HIDDEN SURCHARGE TRAP'}
            {isPhase4 && 'ACT 04 • THE OPERATING MARGIN CRISIS'}
          </span>
        </div>

        <div className="hud-controls-group">
          <button
            type="button"
            className="hud-pill-btn"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
            <span>{isMuted ? 'Muted' : 'Sound FX'}</span>
          </button>

          <button
            type="button"
            className="hud-pill-btn"
            onClick={handleRestart}
            title="Replay from Beginning"
          >
            <RotateCcw size={12} />
            <span>Restart</span>
          </button>

          <button
            type="button"
            className="hud-pill-btn primary"
            onClick={handleCutToSolution}
            title="Skip directly to the platform"
          >
            <span>Skip to Platform</span>
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Main 2D Animated Stage - Full Viewport, Zero Box Borders Cutting Off */}
      <div className="cartoon-stage-wrapper">
        <svg 
          viewBox="0 0 1200 580"
          className="cartoon-svg-canvas"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Subtle Headlight Cone - Pure Translucent White */}
            <linearGradient id="monoHeadlightBeam" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Subtle Monochrome Ambient Spotlight */}
            <radialGradient id="monoAmbientSpot" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Subtle Contact Blur Filter */}
            <filter id="monoContactBlur">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Deep Black Architectural Background */}
          <rect x="0" y="0" width="1200" height="580" fill="#000000" />
          
          {/* Subtle Ambient Overhead Spot */}
          <circle cx="340" cy="280" r="320" fill="url(#monoAmbientSpot)" />

          {/* Clean Floor Horizon Hairline */}
          <line x1="40" y1="460" x2="1160" y2="460" stroke="#27272a" strokeWidth="1.5" />

          {/* Minimalist Architectural Wall Frame (Ramesh Workshop Blueprint) */}
          <g opacity="0.6">
            <rect x="80" y="140" width="110" height="85" fill="#09090b" stroke="#27272a" strokeWidth="1" rx="2" />
            <line x1="95" y1="165" x2="175" y2="165" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="95" y1="185" x2="155" y2="185" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="95" y1="205" x2="165" y2="205" stroke="#3f3f46" strokeWidth="1" strokeDasharray="3 3" />
            <text x="135" y="157" fill="#71717a" fontSize="7.5" fontWeight="700" textAnchor="middle" letterSpacing="1">
              SPEC: 5000 LOT
            </text>
          </g>

          {/* Minimalist Wooden Drafting Workbench */}
          <rect x="180" y="380" width="160" height="80" fill="#0d0d0d" stroke="#27272a" strokeWidth="1.5" rx="2" />
          <line x1="175" y1="380" x2="345" y2="380" stroke="#52525b" strokeWidth="2" />
          
          {/* Minimal Line Art Telephone on Desk */}
          <rect x="200" y="366" width="30" height="14" fill="#18181b" stroke="#52525b" strokeWidth="1" rx="2" />
          <path d="M 196 366 Q 215 354 234 366" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

          {/* Floor Soft Contact Shadow for Ramesh */}
          <ellipse cx="320" cy="462" rx="26" ry="6" fill="#18181b" filter="url(#monoContactBlur)" />

          {/* =========================================================
              MINIMALIST MONOCHROME CHARACTER: RAMESH
              Position: x=300, y=340
              ========================================================= */}
          <g transform={`translate(300, ${340 - rameshHop + rameshBreathe})`}>
            {/* Minimalist Silhouette Torso */}
            <path d="M 12 40 L 32 40 L 36 82 L 8 82 Z" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" />
            {/* White Collar Notch */}
            <polygon points="18,40 26,40 22,48" fill="#ffffff" />
            {/* Minimalist buttons */}
            <circle cx="22" cy="56" r="1.5" fill="#a1a1aa" />
            <circle cx="22" cy="66" r="1.5" fill="#a1a1aa" />
            <circle cx="22" cy="76" r="1.5" fill="#a1a1aa" />

            {/* Minimalist Head */}
            <circle cx="22" cy="20" r="18" fill="#09090b" stroke="#ffffff" strokeWidth="2" />
            
            {/* Minimalist Clean Hairline */}
            <path d="M 5 18 Q 12 3 32 5 Q 40 8 38 18 Q 32 10 22 10 Q 10 10 5 18 Z" fill="#ffffff" />

            {/* Minimalist Spectacles */}
            <rect x="12" y="14" width="8" height="7" rx="1" fill="none" stroke="#ffffff" strokeWidth="1.5" />
            <rect x="23" y="14" width="8" height="7" rx="1" fill="none" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="20" y1="17" x2="23" y2="17" stroke="#ffffff" strokeWidth="1.5" />

            {/* Animated Eyes & Minimalist Expressions */}
            {!isPhase4 ? (
              <g>
                {/* Natural eyelid blink */}
                {isBlinking ? (
                  <g>
                    <line x1="14" y1="18" x2="18" y2="18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="25" y1="18" x2="29" y2="18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  </g>
                ) : (
                  <g>
                    <circle cx="16" cy="18" r="1.8" fill="#ffffff" />
                    <circle cx="27" cy="18" r="1.8" fill="#ffffff" />
                  </g>
                )}

                {/* Eyebrows */}
                {isPhase3 ? (
                  // Shocked raised eyebrows
                  <g>
                    <line x1="13" y1="11" x2="19" y2="10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="24" y1="10" x2="30" y2="11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                  </g>
                ) : (
                  <g>
                    <line x1="13" y1="12" x2="19" y2="12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="24" y1="12" x2="30" y2="12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                  </g>
                )}

                {/* Mouth */}
                {isPhase1 ? (
                  // Speaking phonemes
                  <path 
                    d={`M 17 26 Q 22 ${28 + Math.sin(movieTime * 14) * 2.5} 27 26`} 
                    fill="none" 
                    stroke="#ffffff" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                  />
                ) : isPhase3 ? (
                  // Agape shock mouth
                  <ellipse cx="22" cy="28" rx="3.5" ry="4.5" fill="#ffffff" />
                ) : (
                  <path d="M 17 27 Q 22 29 27 27" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                )}
              </g>
            ) : (
              // PHASE 4: Pure Minimalist Anguish
              <g>
                <line x1="13" y1="18" x2="19" y2="15" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                <line x1="24" y1="15" x2="30" y2="18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                <ellipse cx="22" cy="29" rx="5" ry="7" fill="none" stroke="#ffffff" strokeWidth="2" />
              </g>
            )}

            {/* Stylized Arms with Cuffs */}
            {isPhase1 && (
              // Holding telephone receiver
              <g>
                <path d="M 12 46 L -2 30 L 4 20" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <path d="M 32 46 L 46 26 L 40 18" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                {/* Receiver in hand */}
                <rect x="38" y="10" width="6" height="18" fill="#ffffff" rx="2" />
              </g>
            )}
            {isPhase2 && (
              // Waiting posture
              <g>
                <path d="M 12 46 L 4 60 L 16 68" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <path d="M 32 46 L 40 60 L 28 68" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}
            {isPhase3 && (
              // Shock hands reaching out
              <g>
                <path d="M 12 46 L 0 38 L 14 30" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <path d="M 32 46 L 56 36 L 72 32" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}
            {isPhase4 && (
              // Hands on head in crisis
              <g>
                <path d="M 12 48 L -2 30 L 8 16" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <path d="M 32 48 L 46 30 L 36 16" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}

            {/* Minimalist Legs */}
            <path d="M 14 82 L 14 118" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 30 82 L 30 118" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" />
            <rect x="7" y="116" width="14" height="6" fill="#ffffff" rx="2" />
            <rect x="24" y="116" width="14" height="6" fill="#ffffff" rx="2" />
          </g>

          {/* =========================================================
              ACT 01: MINIMALIST QUOTATION CONFIRMATION CARD
              Positioned safely above Ramesh with ample margins
              ========================================================= */}
          {isPhase1 && (
            <g transform="translate(230, 110)">
              {/* Minimalist Speech Card */}
              <rect x="0" y="0" width="340" height="95" fill="#ffffff" stroke="#ffffff" strokeWidth="1" rx="8" />
              {/* Speech pointer */}
              <polygon points="90,95 105,95 85,115" fill="#ffffff" />
              
              <text x="20" y="26" fill="#71717a" fontSize="9" fontWeight="700" letterSpacing="1.5">
                RAMESH • MSME WORKSHOP FOUNDER
              </text>
              <text x="20" y="50" fill="#000000" fontSize="13" fontWeight="800">
                “Quotation approved: 5,000 units at ₹2.85/unit.”
              </text>
              <text x="20" y="74" fill="#18181b" fontSize="12" fontWeight="500">
                “Total ₹14,250 door-delivered. Dispatched in 7 days.”
              </text>
            </g>
          )}

          {/* =========================================================
              ACT 02 & 03: ARCHITECTURAL MONOCHROME TRANSPORTER VAN
              Enters from x=1200, stops cleanly at x=680
              ========================================================= */}
          {(isPhase2 || isPhase3) && (
            <g transform={`translate(${truckX}, ${280 + truckBounce})`}>
              {/* Headlight Volumetric Beam Cone */}
              <polygon points="0,95 -240,60 -240,165 0,135" fill="url(#monoHeadlightBeam)" />

              {/* Transporter Shadow */}
              <ellipse cx="140" cy="180" rx="145" ry="10" fill="#18181b" filter="url(#monoContactBlur)" />

              {/* Van Body (Solid Dark Charcoal with Crisp White Outlines) */}
              <path 
                d="M 0 100 L 0 160 L 290 160 L 290 40 L 80 40 L 40 100 Z" 
                fill="#0d0d0d" 
                stroke="#ffffff" 
                strokeWidth="2" 
              />
              
              {/* Windshield */}
              <polygon points="46,95 80,48 80,95" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" />
              
              {/* Side Cargo Seam */}
              <line x1="160" y1="40" x2="160" y2="160" stroke="#27272a" strokeWidth="1.5" />

              {/* Architectural Fleet Branding in Pure White */}
              <text x="185" y="80" fill="#ffffff" fontSize="11" fontWeight="800" letterSpacing="2">
                EXPRESS B2B
              </text>
              <text x="185" y="98" fill="#71717a" fontSize="8" fontWeight="600" letterSpacing="1">
                MORADABAD LOGISTICS
              </text>

              {/* Crisp Headlight & Grille */}
              <rect x="0" y="105" width="6" height="24" fill="#ffffff" rx="1" />
              <line x1="8" y1="115" x2="28" y2="115" stroke="#3f3f46" strokeWidth="2" />
              <line x1="8" y1="125" x2="28" y2="125" stroke="#3f3f46" strokeWidth="2" />

              {/* Front Wheel (Alloy Spokes Rotating) */}
              <g transform="translate(65, 160)">
                <circle cx="0" cy="0" r="22" fill="#000000" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="13" fill="#18181b" stroke="#ffffff" strokeWidth="1" />
                <g transform={`rotate(${truckWheelRot})`}>
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              </g>

              {/* Rear Dual Wheels */}
              <g transform="translate(230, 160)">
                <circle cx="0" cy="0" r="22" fill="#000000" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="13" fill="#18181b" stroke="#ffffff" strokeWidth="1" />
                <g transform={`rotate(${truckWheelRot})`}>
                  <line x1="-12" y1="0" x2="12" y2="0" stroke="#ffffff" strokeWidth="1.5" />
                  <line x1="0" y1="-12" x2="0" y2="12" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              </g>
            </g>
          )}

          {/* =========================================================
              MINIMALIST MONOCHROME COURIER
              Steps out from vehicle: x=580, y=340
              ========================================================= */}
          {(isPhase2 || isPhase3) && (
            <g transform={`translate(${620 - driverStep * 80}, 340)`}>
              {/* Floor Shadow */}
              <ellipse cx="20" cy="122" rx="22" ry="5" fill="#18181b" filter="url(#monoContactBlur)" />

              {/* Torso & Uniform in Dark Charcoal with Crisp White Trim */}
              <path d="M 10 40 L 30 40 L 34 82 L 6 82 Z" fill="#18181b" stroke="#ffffff" strokeWidth="1.5" />
              {/* Courier Cap */}
              <path d="M 6 12 Q 20 4 34 12 L 40 14 L 30 16 L 6 16 Z" fill="#ffffff" stroke="#ffffff" strokeWidth="1" />
              
              {/* Head */}
              <circle cx="20" cy="20" r="16" fill="#09090b" stroke="#ffffff" strokeWidth="2" />
              {/* Eyes & expression */}
              <circle cx="16" cy="20" r="1.8" fill="#ffffff" />
              <circle cx="25" cy="20" r="1.8" fill="#ffffff" />
              <line x1="16" y1="28" x2="24" y2="28" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />

              {/* Arms holding Delivery Clipboard */}
              <path d="M 8 46 L -8 56 L 2 64" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              <path d="M 32 46 L 20 60 L 6 64" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
              {/* Minimal Clipboard */}
              <rect x="-10" y="52" width="20" height="26" fill="#ffffff" rx="2" />
              <rect x="-4" y="50" width="8" height="4" fill="#000000" rx="1" />
              <line x1="-6" y1="60" x2="6" y2="60" stroke="#000000" strokeWidth="1.5" />
              <line x1="-6" y1="66" x2="4" y2="66" stroke="#000000" strokeWidth="1.5" />

              {/* Legs */}
              <path d="M 12 82 L 12 118" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M 28 82 L 28 118" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" />
              <rect x="5" y="116" width="14" height="6" fill="#ffffff" rx="2" />
              <rect x="22" y="116" width="14" height="6" fill="#ffffff" rx="2" />
            </g>
          )}

          {/* =========================================================
              ACT 02: COURIER ARRIVAL DIALOGUE CARD
              ========================================================= */}
          {isPhase2 && movieTime > 6.8 && (
            <g transform="translate(480, 110)">
              <rect x="0" y="0" width="350" height="95" fill="#ffffff" stroke="#ffffff" strokeWidth="1" rx="8" />
              <polygon points="80,95 95,95 75,115" fill="#ffffff" />
              
              <text x="20" y="26" fill="#71717a" fontSize="9" fontWeight="700" letterSpacing="1.5">
                LOGISTICS COURIER
              </text>
              <text x="20" y="50" fill="#000000" fontSize="13" fontWeight="800">
                “Consignment arrived from Moradabad factory.”
              </text>
              <text x="20" y="74" fill="#18181b" fontSize="12" fontWeight="500">
                “5,000 units. Please inspect and settle dispatch invoice.”
              </text>
            </g>
          )}

          {/* =========================================================
              ACT 03: THE UNROLLING INVOICE & HIDDEN SURCHARGE TRAP
              ========================================================= */}
          {isPhase3 && (
            <g transform="translate(360, 90)">
              {/* Ramesh Panic Card */}
              <g transform="translate(-160, 0)">
                <rect x="0" y="0" width="280" height="95" fill="#ffffff" stroke="#ffffff" strokeWidth="1" rx="8" />
                <polygon points="120,95 135,95 115,115" fill="#ffffff" />
                <text x="16" y="24" fill="#71717a" fontSize="8.5" fontWeight="700" letterSpacing="1">
                  RAMESH • OBJECTION
                </text>
                <text x="16" y="46" fill="#000000" fontSize="12" fontWeight="800">
                  “Wait! The quote was ₹14,250 all-in!”
                </text>
                <text x="16" y="68" fill="#18181b" fontSize="11" fontWeight="600">
                  “Why does this bill demand ₹22,865?!”
                </text>
              </g>

              {/* The Unrolling Dispatch Invoice */}
              <g transform="translate(145, 10)">
                <rect x="0" y="0" width="160" height={scrollUnroll} fill="#ffffff" stroke="#ffffff" strokeWidth="1.5" rx="4" />
                
                <text x="80" y="22" fill="#000000" fontSize="9.5" fontWeight="900" textAnchor="middle" letterSpacing="1">
                  DISPATCH INVOICE
                </text>
                <line x1="12" y1="28" x2="148" y2="28" stroke="#e4e4e7" strokeWidth="1" strokeDasharray="3 2" />

                {scrollUnroll > 60 && (
                  <g>
                    <text x="16" y="46" fill="#71717a" fontSize="9" fontWeight="700">Base Goods:</text>
                    <text x="144" y="46" fill="#000000" fontSize="9" fontWeight="800" textAnchor="end">₹14,250</text>
                  </g>
                )}

                {scrollUnroll > 105 && (
                  <g>
                    <text x="16" y="70" fill="#000000" fontSize="9" fontWeight="700">+ Freight Tariffs:</text>
                    <text x="144" y="70" fill="#000000" fontSize="9" fontWeight="800" textAnchor="end">+ ₹4,850</text>
                  </g>
                )}

                {scrollUnroll > 150 && (
                  <g>
                    <text x="16" y="94" fill="#000000" fontSize="9" fontWeight="700">+ 18% GST Added:</text>
                    <text x="144" y="94" fill="#000000" fontSize="9" fontWeight="800" textAnchor="end">+ ₹2,565</text>
                  </g>
                )}

                {scrollUnroll > 190 && (
                  <g>
                    <text x="16" y="118" fill="#000000" fontSize="9" fontWeight="700">+ Unloading Surcharge:</text>
                    <text x="144" y="118" fill="#000000" fontSize="9" fontWeight="800" textAnchor="end">+ ₹1,200</text>
                    
                    <line x1="12" y1="128" x2="148" y2="128" stroke="#000000" strokeWidth="1.5" />
                    
                    <text x="16" y="146" fill="#000000" fontSize="10" fontWeight="900">TOTAL DEMAND:</text>
                    <text x="144" y="146" fill="#000000" fontSize="11" fontWeight="900" textAnchor="end">₹22,865</text>

                    {/* Minimalist Monochrome Rubber Stamp */}
                    <g transform={`translate(18, 160) scale(${1.4 - stampImpact * 0.4})`} style={{ transformOrigin: '60px 14px' }}>
                      <rect x="0" y="0" width="124" height="28" fill="#000000" stroke="#ffffff" strokeWidth="1.5" rx="3" />
                      <text x="62" y="18" fill="#ffffff" fontSize="9.5" fontWeight="900" textAnchor="middle" letterSpacing="1">
                        +60% SURCHARGE
                      </text>
                    </g>
                  </g>
                )}
              </g>

              {/* Courier Response Card */}
              <g transform="translate(325, 0)">
                <rect x="0" y="0" width="280" height="95" fill="#18181b" stroke="#3f3f46" strokeWidth="1" rx="8" />
                <polygon points="40,95 55,95 35,115" fill="#18181b" />
                <text x="16" y="24" fill="#a1a1aa" fontSize="8.5" fontWeight="700" letterSpacing="1">
                  LOGISTICS COURIER
                </text>
                <text x="16" y="46" fill="#ffffff" fontSize="12" fontWeight="700">
                  “Freight and taxes were excluded.”
                </text>
                <text x="16" y="68" fill="#d4d4d8" fontSize="11" fontWeight="500">
                  “Pay ₹22,865 now, or cargo returns.”
                </text>
              </g>
            </g>
          )}

          {/* =========================================================
              ACT 04: THE OPERATING MARGIN CRISIS (ENDS ON THE PROBLEM)
              Centered gracefully within 1200x580 viewport with >200px margins
              ========================================================= */}
          {isPhase4 && (
            <g transform="translate(260, 70)">
              {/* Clean Minimalist Crisis Banner Card */}
              <rect 
                x="0" 
                y="0" 
                width="680" 
                height="240" 
                fill="#0d0d0d" 
                stroke="#ffffff" 
                strokeWidth="2" 
                rx="12" 
              />

              <text x="40" y="42" fill="#71717a" fontSize="10" fontWeight="700" letterSpacing="2">
                THE MSME WHOLESALE PROCUREMENT CRISIS
              </text>

              <text x="40" y="78" fill="#ffffff" fontSize="18" fontWeight="800" letterSpacing="-0.02em">
                Artificial baseline rates conceal 40%–60% hidden fees.
              </text>

              <line x1="40" y1="100" x2="640" y2="100" stroke="#27272a" strokeWidth="1" />

              <text x="40" y="126" fill="#d4d4d8" fontSize="13" fontWeight="500">
                • Unquoted freight tariffs, undisclosed 18% GST, and surprise unloading fees.
              </text>
              <text x="40" y="150" fill="#d4d4d8" fontSize="13" fontWeight="500">
                • Small business and restaurant profit margins are completely wiped out on delivery.
              </text>
              <text x="40" y="174" fill="#d4d4d8" fontSize="13" fontWeight="500">
                • Millions of MSME founders face this trap on every single raw material order.
              </text>

              <rect x="40" y="194" width="600" height="32" fill="#18181b" rx="6" />
              <text x="54" y="215" fill="#ffffff" fontSize="11.5" fontWeight="700" letterSpacing="0.5">
                PROBLEM: Where is guaranteed, transparent true landed cost pricing for wholesale buyers?
              </text>
            </g>
          )}
        </svg>

        {/* Transition Cut Banner at Phase 4 */}
        {isPhase4 && (
          <div className="cartoon-solution-banner">
            <div className="solution-callout">
              <span className="solution-pill">THE SOLUTION EXISTS</span>
              <h2 className="solution-heading">PROCURESAATHI B2B TRUTH ENGINE</h2>
              <p className="solution-sub">Autonomous AI audit of ex-factory rates, guaranteed freight, and zero hidden taxes.</p>
            </div>
            <button 
              type="button" 
              className="solution-enter-btn"
              onClick={handleCutToSolution}
            >
              <span>EXPLORE PLATFORM SOLUTION</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Video Player Scrubber Bar - Pure Monochrome Minimal */}
      <div className="cartoon-player-footer">
        <div className="player-timeline-bar">
          <div 
            className="player-timeline-fill"
            style={{ width: `${(movieTime / TOTAL_DURATION) * 100}%` }}
          />
        </div>

        <div className="player-controls-row">
          <div className="controls-left">
            <button
              type="button"
              className="player-toggle-btn"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <span className="time-display">
              00:{Math.floor(movieTime).toString().padStart(2, '0')} / 00:24
            </span>
          </div>

          <div className="controls-right">
            <button
              type="button"
              className="cut-to-solution-btn"
              onClick={handleCutToSolution}
            >
              <span>{isPhase4 ? 'LAUNCH PLATFORM' : 'SEE SOLUTION'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
