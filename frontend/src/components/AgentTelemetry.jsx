import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Activity,
  Check
} from 'lucide-react';

const PIPELINE_STAGES = [
  { id: 'nlp', label: 'Intent Analysis' },
  { id: 'search', label: 'Supplier Discovery' },
  { id: 'fetch', label: 'Catalog Extraction' },
  { id: 'normalize', label: 'Landed Cost Audit' },
  { id: 'rfq', label: 'Quotation Ready' },
];

export default function AgentTelemetry({ steps, isLive, executionMode, executionTime }) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="telemetry-card">
      <div className="telemetry-header">
        <div className="telemetry-title-block">
          <div className="pulse-radar"></div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={17} color="var(--text-primary)" />
              <span>Live Sourcing Verification Trace</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Real-time supplier search • Mode: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{executionMode}</span> {isLive && '• (Live Session)'} • Completed in <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{executionTime}s</span>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: '#111827', background: '#f3f4f6', padding: '0.3rem 0.75rem', borderRadius: '9999px', border: '1px solid #e5e7eb', fontWeight: 600 }}>
            <CheckCircle2 size={13} />
            <span>{steps.length} Checkpoints Verified</span>
          </div>

          <button
            type="button"
            className="btn-icon-subtle"
            style={{ padding: '0.3rem 0.6rem' }}
            onClick={() => setIsExpanded(!isExpanded)}
            title="Toggle Sourcing Trace Log"
          >
            {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      {/* Visual Pipeline Stages Stepper */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        gap: '0.5rem', 
        padding: '0.75rem 1rem', 
        background: '#f9fafb', 
        borderRadius: '12px', 
        marginBottom: isExpanded ? '1.25rem' : '0', 
        border: '1px solid var(--border-subtle)',
        overflowX: 'auto'
      }}>
        {PIPELINE_STAGES.map((stg, i) => (
          <React.Fragment key={stg.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', whiteSpace: 'nowrap', color: 'var(--text-primary)', fontWeight: 600 }}>
              <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#111827', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={11} strokeWidth={2.5} />
              </span>
              <span>{stg.label}</span>
            </div>
            {i < PIPELINE_STAGES.length - 1 && (
              <ArrowRight size={12} color="#9ca3af" style={{ flexShrink: 0 }} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Expanded Steps List */}
      {isExpanded && (
        <div className="telemetry-steps-list">
          {steps.map((step) => {
            const isWarning = step.status === 'warning';
            return (
              <div key={step.step_number} className={`telemetry-step-item ${isWarning ? 'warning' : ''}`}>
                <div className="step-num-badge">
                  Stage {step.step_number}
                </div>

                <div className="step-info">
                  <div className="step-title-line">
                    <div className="step-name">
                      {step.title}
                    </div>
                    <div className="step-time">
                      <Clock size={11} style={{ display: 'inline', marginRight: '3px' }} />
                      {step.timestamp}
                    </div>
                  </div>

                  <div className="step-detail-text">
                    {step.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
