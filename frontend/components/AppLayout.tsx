'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Cravings', path: '/cravings', icon: '🍪' },
    { name: 'Weekly Plan', path: '/week-plan', icon: '📅' },
    { name: 'Settings', path: '/settings', icon: '⚙️' },
  ]

  return (
    <div className="ns-layout">
      <nav className="ns-sidebar">
        <div className="ns-logo">
          <div className="ns-logo-icon">🌿</div>
          <div className="ns-logo-text">NutriSense</div>
        </div>
        
        <div className="ns-nav">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`ns-nav-item ${pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      <nav className="ns-mobile-nav">
        {navItems.map(item => (
          <Link 
            key={item.path} 
            href={item.path}
            className={`ns-mobile-nav-item ${pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>

      <main className="ns-main">
        <div className="ns-container">
          {children}
        </div>
      </main>
    </div>
  )
}
