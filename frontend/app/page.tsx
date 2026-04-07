'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetchAPI } from '@/lib/api'

export default function Home() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [name, setName] = useState('Priya')
  const [email, setEmail] = useState('priya@example.com')
  const [password, setPassword] = useState('password123')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isLogin) {
        const data = await fetchAPI('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        })
        localStorage.setItem('ns_token', data.token)
        router.push('/dashboard')
      } else {
        const data = await fetchAPI('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password })
        })
        localStorage.setItem('ns_token', data.token)
        router.push('/onboarding')
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ns-layout ns-items-center" style={{ justifyContent: 'center' }}>
      <div className="ns-card" style={{ maxWidth: '400px', width: '100%', margin: '0 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div className="ns-logo-icon" style={{ margin: '0 auto 16px', background: 'var(--ns-grad-primary)' }}>🌿</div>
          <h1 className="ns-title" style={{ fontSize: '1.8rem' }}>NutriSense</h1>
          <p className="ns-subtitle">Your Clinically-Aware Food Guide</p>
        </div>

        <form onSubmit={handleSubmit} className="ns-form-group">
          {!isLogin && (
            <div>
              <label className="ns-label">Name</label>
              <input 
                type="text" 
                className="ns-input" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
              />
            </div>
          )}
          
          <div>
            <label className="ns-label">Email</label>
            <input 
              type="email" 
              className="ns-input" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div>
            <label className="ns-label">Password</label>
            <input 
              type="password" 
              className="ns-input" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="ns-btn ns-btn-primary ns-w-full ns-mt-4" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: 'var(--ns-primary-light)', fontSize: '0.9rem' }}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  )
}
