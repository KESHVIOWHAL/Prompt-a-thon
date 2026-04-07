'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetchAPI } from '@/lib/api'

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  const [condition, setCondition] = useState('GENERAL_HEALTHY')
  const [language, setLanguage] = useState('english')
  const [foodPreference, setFoodPreference] = useState('veg')

  const handleComplete = async () => {
    setLoading(true)
    try {
      await fetchAPI('/user/profile', {
        method: 'PUT',
        body: JSON.stringify({ condition, language, foodPreference })
      })
      router.push('/dashboard')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ns-layout ns-items-center" style={{ justifyContent: 'center' }}>
      <div className="ns-card ns-fade-up" style={{ maxWidth: '600px', width: '100%', margin: '0 16px' }}>
        <div className="ns-steps">
          <div className={`ns-step-dot ${step >= 1 ? 'active' : ''}`}></div>
          <div className={`ns-step-dot ${step >= 2 ? 'active' : ''}`}></div>
          <div className={`ns-step-dot ${step >= 3 ? 'active' : ''}`}></div>
        </div>

        {step === 1 && (
          <div className="ns-fade-up">
            <h2 className="ns-title ns-mb-4" style={{ fontSize: '1.8rem' }}>What's your primary health focus?</h2>
            <p className="ns-subtitle ns-mb-8">This determines how NutriSense engines respond to your needs.</p>
            
            <div className="ns-condition-grid ns-mb-8">
              <div 
                className={`ns-condition-card ${condition === 'PCOS_PCOD' ? 'selected-pcos' : ''}`}
                onClick={() => setCondition('PCOS_PCOD')}
              >
                <div className="ns-condition-emoji">🌸</div>
                <div className="ns-condition-title">PCOS / Hormonal Balance</div>
                <div className="ns-condition-desc">Focus on insulin resistance and androgen balance.</div>
              </div>
              <div 
                className={`ns-condition-card ${condition === 'PREGNANCY' ? 'selected-pregnancy' : ''}`}
                onClick={() => setCondition('PREGNANCY')}
              >
                <div className="ns-condition-emoji">🤰</div>
                <div className="ns-condition-title">Pregnancy</div>
                <div className="ns-condition-desc">Trimester-safe nourishment for you and baby.</div>
              </div>
              <div 
                className={`ns-condition-card ${condition === 'ANOREXIA_LOW_APPETITE' ? 'selected-anorexia' : ''}`}
                onClick={() => setCondition('ANOREXIA_LOW_APPETITE')}
              >
                <div className="ns-condition-emoji">💛</div>
                <div className="ns-condition-title">Low Appetite</div>
                <div className="ns-condition-desc">Gentle, pressure-free nourishment steps.</div>
              </div>
              <div 
                className={`ns-condition-card ${condition === 'GENERAL_HEALTHY' ? 'selected-general' : ''}`}
                onClick={() => setCondition('GENERAL_HEALTHY')}
              >
                <div className="ns-condition-emoji">🌿</div>
                <div className="ns-condition-title">General Health</div>
                <div className="ns-condition-desc">Balanced, vibrant everyday eating.</div>
              </div>
            </div>
            <button className="ns-btn ns-btn-primary ns-w-full" onClick={() => setStep(2)}>Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="ns-fade-up">
            <h2 className="ns-title ns-mb-4" style={{ fontSize: '1.8rem' }}>Preferred Language</h2>
            <p className="ns-subtitle ns-mb-8">We speak your language. All recipes and nudges will adapt.</p>
            
            <div className="ns-lang-pills ns-mb-8">
              {['english', 'hindi', 'marathi', 'bengali', 'tamil', 'telugu', 'gujarati', 'kannada'].map(l => (
                <button 
                  key={l}
                  className={`ns-lang-pill ${language === l ? 'selected' : ''}`}
                  onClick={() => setLanguage(l)}
                  style={{ textTransform: 'capitalize' }}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="ns-flex ns-gap-4">
              <button className="ns-btn ns-btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button className="ns-btn ns-btn-primary ns-w-full" onClick={() => setStep(3)}>Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="ns-fade-up">
            <h2 className="ns-title ns-mb-4" style={{ fontSize: '1.8rem' }}>Dietary Preference</h2>
            <p className="ns-subtitle ns-mb-8">Help us tailor your meal plans.</p>
            
            <select 
              className="ns-select ns-mb-8"
              value={foodPreference}
              onChange={(e) => setFoodPreference(e.target.value)}
            >
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="jain">Jain / No Onion Garlic</option>
            </select>

            <div className="ns-flex ns-gap-4">
              <button className="ns-btn ns-btn-secondary" onClick={() => setStep(2)}>Back</button>
              <button className="ns-btn ns-btn-primary ns-w-full" onClick={handleComplete} disabled={loading}>
                {loading ? 'Setting up profile...' : 'Complete Setup'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
