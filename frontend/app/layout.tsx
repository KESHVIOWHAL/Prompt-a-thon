import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NutriSense — Your Clinically-Aware Food Intelligence',
  description: 'Personalised nutrition guidance for PCOS, Pregnancy, and general health — multilingual, condition-aware, and culturally rooted.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body>{children}</body>
    </html>
  )
}
