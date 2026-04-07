'use client'

import { useState, useEffect } from 'react'
import AppLayout from '@/components/AppLayout'
import { fetchAPI } from '@/lib/api'

export default function WeekPlan() {
  const [plan, setPlan] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  const loadPlan = async () => {
    setLoading(true)
    try {
      const data = await fetchAPI('/plan/current')
      setPlan(data)
    } catch (err: any) {
      if (err.message.includes('No meal plan found')) {
        setPlan(null)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPlan()
  }, [])

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      const data = await fetchAPI('/plan/generate', { method: 'POST' })
      setPlan(data)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setGenerating(false)
    }
  }

  if (loading) return <AppLayout><div className="ns-spinner"></div></AppLayout>

  return (
    <AppLayout>
      <div className="ns-page-header ns-fade-up">
        <h1 className="ns-title" style={{ fontSize: '2rem' }}>Weekly Meal Plan</h1>
        <p className="ns-subtitle">Personalised across 7 days for your current profile.</p>
      </div>

      {!plan && (
        <div className="ns-card ns-fade-up-1" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div className="ns-condition-emoji" style={{ fontSize: '4rem', marginBottom: '20px' }}>📅</div>
          <h2 className="ns-title ns-mb-4" style={{ fontSize: '1.4rem' }}>No plan found</h2>
          <p className="ns-subtitle ns-mb-6">Generate your first clinically-aware weekly meal plan.</p>
          <button 
            className="ns-btn ns-btn-primary" 
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? 'Generating your plan...' : 'Generate Meal Plan'}
          </button>
        </div>
      )}

      {plan && (
        <div className="ns-fade-up-1">
          <div className="ns-card ns-mb-8" style={{ background: 'var(--ns-surface-2)' }}>
            <h2 className="ns-title" style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
              {plan.weekly_theme}
            </h2>
            <div className="ns-flex ns-justify-between ns-items-center">
              <p className="ns-text-muted">{plan.condition_note}</p>
              <button 
                className="ns-btn ns-btn-secondary ns-btn-sm" 
                onClick={handleGenerate}
                disabled={generating}
              >
                Regenerate
              </button>
            </div>
          </div>

          <div className="ns-plan-grid">
            {plan.days.map((dayData: any, i: number) => (
              <div key={i} className="ns-day-card">
                <div className="ns-day-header">{dayData.day}</div>
                
                <div className="ns-meal-row">
                  <div className="ns-meal-type">Breakfast</div>
                  <div className="ns-meal-content">
                    <div className="ns-meal-name">{dayData.breakfast.name}</div>
                    <div className="ns-meal-why">{dayData.breakfast.why}</div>
                  </div>
                </div>

                <div className="ns-meal-row">
                  <div className="ns-meal-type">Lunch</div>
                  <div className="ns-meal-content">
                    <div className="ns-meal-name">{dayData.lunch.name}</div>
                    <div className="ns-meal-why">{dayData.lunch.why}</div>
                  </div>
                </div>

                <div className="ns-meal-row">
                  <div className="ns-meal-type">Snack</div>
                  <div className="ns-meal-content">
                    <div className="ns-meal-name">{dayData.snack.name}</div>
                    <div className="ns-meal-why">{dayData.snack.why}</div>
                  </div>
                </div>

                <div className="ns-meal-row">
                  <div className="ns-meal-type">Dinner</div>
                  <div className="ns-meal-content">
                    <div className="ns-meal-name">{dayData.dinner.name}</div>
                    <div className="ns-meal-why">{dayData.dinner.why}</div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  )
}
