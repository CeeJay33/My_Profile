import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        obsidian: {
          950: '#030509',
          900: '#060A12',
          800: '#0B111E',
          700: '#111A2E',
          600: '#192540'
        },
        mint: {
          DEFAULT: '#00FFA3',
          400: '#33FFB5',
          500: '#00FFA3',
          600: '#00CC82',
          glow: 'rgba(0, 255, 163, 0.25)'
        },
        cyber: {
          cyan: '#00E5FF',
          violet: '#8B5CF6',
          lime: '#ADFF2F',
          amber: '#F59E0B'
        }
      },
      animation: {
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
        'shimmer': 'shimmer 3s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    }
  },
  plugins: []
}
