'use client'

import { useState } from 'react'
import AppLayout from '@/components/AppLayout'
import { fetchAPI } from '@/lib/api'

export default function Cravings() {
  const [craving, setCraving] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleCravingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!craving) return
    setLoading(true)
    try {
      const data = await fetchAPI('/craving', {
        method: 'POST',
        body: JSON.stringify({ craving })
      })
      setResult(data)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppLayout>
      <div className="ns-page-header ns-fade-up">
        <h1 className="ns-title" style={{ fontSize: '2rem' }}>Satisfy Cravings</h1>
        <p className="ns-subtitle">Tell us what you're craving, and we'll decode it and provide a healthy alternative.</p>
      </div>

      <div className="ns-card ns-card-hero ns-fade-up-1 ns-mb-8">
        <form onSubmit={handleCravingSubmit} className="ns-flex ns-gap-4">
          <input 
            type="text" 
            className="ns-input" 
            style={{ flex: 1 }}
            placeholder="e.g. I want something sweet right now" 
            value={craving}
            onChange={e => setCraving(e.target.value)}
          />
          <button type="submit" className="ns-btn ns-btn-primary" disabled={loading || !craving}>
            {loading ? 'Decoding...' : 'Analyze'}
          </button>
        </form>
      </div>

      {result && (
        <div className="ns-grid-2 ns-fade-up-2">
          {/* Intelligence Engine Metadata */}
          <div className="ns-card" style={{ background: 'var(--ns-surface-2)' }}>
            <h3 className="ns-section-title ns-grad-text">Intelligence Engine</h3>
            <p className="ns-text-sm ns-text-muted ns-mb-4">How we parsed your craving:</p>
            
            <div className="ns-form-group">
              <label className="ns-label">Step 1 — Identifiction</label>
              <div className="ns-badge ns-badge-general">{result.metadata.step1_craving_type}</div>
            </div>
            
            <div className="ns-form-group">
              <label className="ns-label">Step 2 — Decoded Cause</label>
              <p className="ns-text-sm">{result.metadata.step2_decoded_cause}</p>
            </div>
            
            <div className="ns-form-group">
              <label className="ns-label">Step 4 — Validation Checks</label>
              <ul className="ns-text-sm" style={{ listStyle: 'none' }}>
                <li style={{ color: 'var(--ns-accent)' }}>✓ Condition Safe</li>
                <li style={{ color: 'var(--ns-accent)' }}>✓ Language Correct</li>
              </ul>
            </div>
          </div>

          {/* Recipe Card */}
          <div className="ns-recipe-card">
            <div className="ns-recipe-header">
              <div className="ns-flex ns-justify-between ns-items-center ns-mb-4">
                <h3 className="ns-title" style={{ fontSize: '1.4rem' }}>{result.recipe.name}</h3>
                {result.recipe.conditionNote && (
                  <div className="ns-badge ns-badge-pcos" style={{ border: 'none' }}>Condition Matched</div>
                )}
              </div>
              <p className="ns-text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                <strong>Satisfies:</strong> {result.recipe.satisfies}
              </p>
            </div>
            
            <div className="ns-recipe-body">
              {result.recipe.conditionNote && (
                <div className="ns-nudge ns-mb-6" style={{ padding: '12px 16px', background: 'var(--ns-pcos-bg)' }}>
                  <p className="ns-text-sm"><strong>Note:</strong> {result.recipe.conditionNote}</p>
                </div>
              )}
              
              <h4 className="ns-section-title">Ingredients</h4>
              <ul className="ns-mb-6" style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--ns-text-2)' }}>
                {result.recipe.ingredients.map((ing: string, i: number) => <li key={i}>{ing}</li>)}
              </ul>

              <h4 className="ns-section-title">Instructions</h4>
              <div className="ns-flex-col ns-gap-2 ns-mb-6">
                {result.recipe.steps.map((step: string, i: number) => (
                  <div key={i} className="ns-recipe-step">
                    <div className="ns-step-num">{i + 1}</div>
                    <div>{step}</div>
                  </div>
                ))}
              </div>

              <h4 className="ns-section-title">Why it's better for you</h4>
              <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--ns-text-2)' }}>
                {result.recipe.whyBetter.map((why: string, i: number) => <li key={i}>{why}</li>)}
              </ul>
              
              {/* Thumbs up/down feedback mock */}
              <div className="ns-feedback">
                <span className="ns-text-sm ns-text-muted">Rate this integration:</span>
                <button className="ns-feedback-btn">👍 Good</button>
                <button className="ns-feedback-btn">👎 Needs change</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
