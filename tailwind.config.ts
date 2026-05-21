import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void:    '#0c0c0c',
        deep:    '#111111',
        surface: '#181818',
        elevated:'#202020',
        raised:  '#2a2a2a',
        accent: {
          citrus:  '#e8ff4d',
          coral:   '#ff5c35',
          mint:    '#00ffb3',
          magenta: '#ff2d78',
          amber:   '#ffb830',
          white:   '#f2f2f0',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient-flow': 'gradient-flow 6s ease infinite',
        'float-a':       'float-a 7s ease-in-out infinite',
        'float-b':       'float-b 5s ease-in-out infinite',
        'spin-slow':     'spin-slow 22s linear infinite',
        'spin-reverse':  'spin-reverse 16s linear infinite',
        'blink':         'data-blink 1.6s ease-in-out infinite',
        'beam':          'beam-sweep 2.4s ease-in-out infinite',
        'scan':          'scan-line 4s ease-in-out infinite',
        'marquee':       'marquee 28s linear infinite',
        'pulse-ring':    'pulse-ring 2s cubic-bezier(0.455,0.03,0.515,0.955) infinite',
      },
      keyframes: {
        'gradient-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        'float-a': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-14px) rotate(1deg)' },
          '66%':      { transform: 'translateY(-6px) rotate(-0.5deg)' },
        },
        'float-b': {
          '0%, 100%': { transform: 'translateY(-6px) rotate(0.5deg)' },
          '50%':      { transform: 'translateY(8px) rotate(-0.5deg)' },
        },
        'spin-slow':    { from: { transform: 'rotate(0deg)' },   to: { transform: 'rotate(360deg)' } },
        'spin-reverse': { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
        'data-blink': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
        'beam-sweep': {
          '0%':   { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(350%) skewX(-15deg)' },
        },
        'scan-line': {
          '0%':   { transform: 'translateY(-100%)', opacity: '0' },
          '10%':  { opacity: '1' },
          '90%':  { opacity: '1' },
          '100%': { transform: 'translateY(600%)', opacity: '0' },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%':   { boxShadow: '0 0 0 0 rgba(0,255,179,0.5)' },
          '70%':  { boxShadow: '0 0 0 10px rgba(0,255,179,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0,255,179,0)' },
        },
      },
      boxShadow: {
        'glow-citrus': '0 0 40px rgba(232,255,77,0.30)',
        'glow-coral':  '0 0 40px rgba(255,92,53,0.28)',
        'glow-mint':   '0 0 40px rgba(0,255,179,0.22)',
        'glow-sm':     '0 0 20px rgba(232,255,77,0.20)',
      },
    },
  },
  plugins: [],
}
export default config
