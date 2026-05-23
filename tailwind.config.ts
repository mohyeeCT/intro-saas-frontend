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
        bg: '#09090f',
        surface: '#111119',
        border: '#1c1c28',
        accent: '#00c9a7',
        'accent-dim': '#00c9a720',
        text: '#e2e2ee',
        muted: '#5a5a72',
        error: '#ff4d6d',
        warning: '#ffb347',
        success: '#00c9a7',
      },
      fontFamily: {
        sans: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
