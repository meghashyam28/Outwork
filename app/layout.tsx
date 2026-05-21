import type { Metadata } from 'next'
import { Syne, Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import CursorGlow from '@/components/CursorGlow'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Outwork — AI Systems Built to Scale Modern Businesses',
  description:
    'Outwork is an elite AI automation agency building intelligent systems — chatbots, workflow automation, CRM integrations, lead generation, and voice agents — that compound your growth.',
  keywords: ['AI automation', 'workflow automation', 'AI chatbots', 'CRM automation', 'lead generation', 'AI agency'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="antialiased overflow-x-hidden">

        {/* ── Page loader ── */}
        <div id="page-loader" aria-hidden="true">
          <div id="loader-wordmark">OUTWORK</div>
          <div id="loader-bar-track">
            <div id="loader-bar" />
          </div>
        </div>

        {/* ── Cursor glow ── */}
        <CursorGlow />

        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
