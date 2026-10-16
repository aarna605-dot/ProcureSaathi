import React from 'react';
import { Activity, CheckCircle2, AlertCircle, Clock, Globe, ArrowRight } from 'lucide-react';

export default function AgentTelemetry({ steps, isLive, executionMode, executionTime }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="telemetry-card">
      <div className="telemetry-header">
        <div className="telemetry-title-block">
          <div className="pulse-radar"></div>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Globe size={16} color="#818cf8" />
              TinyFish Agent Telemetry & Scraping Stream
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Live execution trace • Mode: <span style={{ color: '#818cf8', fontWeight: 600 }}>{executionMode}</span> • Completed in {executionTime}s
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.1)', padding: '0.3rem 0.75rem', borderRadius: '9999px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
          <CheckCircle2 size={13} />
          <span>{steps.length} Agent Tasks Executed</span>
        </div>
      </div>

      <div className="telemetry-steps-list">
        {steps.map((step) => {
          const isWarning = step.status === 'warning';
          return (
            <div key={step.step_number} className={`telemetry-step-item ${isWarning ? 'warning' : ''}`}>
              <div className="step-num-badge">
                Step {step.step_number}
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
    </div>
  );
}
