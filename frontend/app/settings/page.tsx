'use client'

import { useState, useEffect } from 'react'
import AppLayout from '@/components/AppLayout'
import { fetchAPI } from '@/lib/api'

export default function Settings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    fetchAPI('/user/profile').then(data => {
      setProfile(data)
      setLoading(false)
    }).catch(err => {
      setLoading(false)
      console.error(err)
    })
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { name, condition, language, foodPreference } = profile
      await fetchAPI('/user/profile', {
        method: 'PUT',
        body: JSON.stringify({ name, condition, language, foodPreference })
      })
      alert('Settings saved successfully!')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <AppLayout><div className="ns-spinner"></div></AppLayout>

  return (
    <AppLayout>
      <div className="ns-page-header ns-fade-up">
        <h1 className="ns-title" style={{ fontSize: '2rem' }}>Settings</h1>
        <p className="ns-subtitle">Adjust your health profile and app preferences.</p>
      </div>

      <div className="ns-card ns-fade-up-1" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSave}>
          <div className="ns-form-group">
            <label className="ns-label">Name</label>
            <input 
              className="ns-input" 
              value={profile?.name || ''} 
              onChange={e => setProfile({...profile, name: e.target.value})} 
            />
          </div>

          <div className="ns-form-group">
            <label className="ns-label">Health Condition</label>
            <select 
              className="ns-select"
              value={profile?.condition || 'GENERAL_HEALTHY'}
              onChange={e => setProfile({...profile, condition: e.target.value})}
            >
              <option value="GENERAL_HEALTHY">General Health</option>
              <option value="PCOS_PCOD">PCOS / PCOD</option>
              <option value="PREGNANCY">Pregnancy</option>
              <option value="ANOREXIA_LOW_APPETITE">Anorexia / Low Appetite</option>
            </select>
          </div>

          <div className="ns-form-group">
            <label className="ns-label">Preferred Language</label>
            <select 
              className="ns-select"
              value={profile?.language || 'english'}
              onChange={e => setProfile({...profile, language: e.target.value})}
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="marathi">Marathi</option>
              <option value="bengali">Bengali</option>
            </select>
            <p className="ns-text-sm ns-text-muted mt-2">Changing language will apply to all recipe titles, instructions, and nudges.</p>
          </div>

          <div className="ns-form-group">
            <label className="ns-label">Dietary Preference</label>
            <select 
              className="ns-select"
              value={profile?.foodPreference || 'veg'}
              onChange={e => setProfile({...profile, foodPreference: e.target.value})}
            >
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="jain">Jain</option>
            </select>
          </div>

          <button type="submit" className="ns-btn ns-btn-primary ns-w-full ns-mt-4" disabled={saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </AppLayout>
  )
}
