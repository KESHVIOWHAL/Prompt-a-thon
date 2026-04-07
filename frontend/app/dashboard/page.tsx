'use client'

import { useState, useEffect } from 'react'
import AppLayout from '@/components/AppLayout'
import { fetchAPI } from '@/lib/api'

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null)
  const [nudge, setNudge] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profData, nudgeData] = await Promise.all([
          fetchAPI('/user/profile'),
          fetchAPI('/nudge/daily')
        ])
        setProfile(profData)
        setNudge(nudgeData)
      } catch (err: any) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return (
    <AppLayout>
      <div className="ns-skeleton ns-skeleton-card ns-mb-4" style={{ height: '80px' }}></div>
      <div className="ns-skeleton ns-skeleton-card ns-mb-4" style={{ height: '200px' }}></div>
      <div className="ns-skeleton ns-skeleton-card" style={{ height: '300px' }}></div>
    </AppLayout>
  )

  const conditionClass = 
    profile?.condition === 'PCOS_PCOD' ? 'ns-badge-pcos' :
    profile?.condition === 'PREGNANCY' ? 'ns-badge-pregnancy' :
    profile?.condition === 'ANOREXIA_LOW_APPETITE' ? 'ns-badge-anorexia' :
    'ns-badge-general'

  return (
    <AppLayout>
      <div className="ns-page-header ns-fade-up">
        <div className="ns-flex ns-justify-between ns-items-center">
          <div>
            <h1 className="ns-title" style={{ fontSize: '2rem' }}>Hi, {profile?.name} 👋</h1>
            <p className="ns-subtitle">Here is your daily personalised summary.</p>
          </div>
          <div className={`ns-badge ${conditionClass}`}>
            {profile?.condition.replace(/_/g, ' ')}
          </div>
        </div>
      </div>

      {nudge && (
        <div className="ns-nudge ns-fade-up-1 ns-mb-8">
          <div className="ns-nudge-icon">✨</div>
          <div>
            <h3 className="ns-section-title" style={{ marginBottom: '4px' }}>
              {nudge.time_of_day === 'morning' ? 'Good Morning' : 'Daily Nudge'}
            </h3>
            <p style={{ color: 'var(--ns-text-2)', fontSize: '0.95rem' }}>{nudge.nudge}</p>
          </div>
        </div>
      )}

      <div className="ns-grid-2 ns-fade-up-2">
        <div className="ns-streak">
          <div className="ns-streak-num">{profile?.streakCount}</div>
          <div>
            <h3 className="ns-section-title" style={{ marginBottom: '2px' }}>Day Streak</h3>
            <p className="ns-text-sm ns-text-muted">Consistent logging builds habits.</p>
          </div>
        </div>

        <div className="ns-card">
          <h3 className="ns-section-title">Log a Meal</h3>
          <p className="ns-text-sm ns-text-muted ns-mb-4">Document what you eat to train your AI.</p>
          <div className="ns-flex ns-gap-4">
            <button className="ns-btn ns-btn-primary ns-btn-sm ns-w-full">Breakfast</button>
            <button className="ns-btn ns-btn-primary ns-btn-sm ns-w-full">Lunch</button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
