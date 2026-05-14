/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: {
          DEFAULT: 'rgb(var(--border) / <alpha-value>)',
          subtle: 'rgb(var(--border-subtle) / <alpha-value>)',
        },
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        elevated: 'rgb(var(--elevated) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          muted: 'rgb(var(--accent-muted) / <alpha-value>)',
        },
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgb(var(--grid) / 0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--grid) / 0.5) 1px, transparent 1px)',
        'glow-radial':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgb(var(--accent) / 0.15), transparent)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        glow: '0 0 80px -20px rgb(var(--accent) / 0.35)',
        card: '0 0 0 1px rgb(var(--border) / 0.6), 0 2px 8px -2px rgb(0 0 0 / 0.08)',
        'card-dark':
          '0 0 0 1px rgb(var(--border) / 0.4), 0 8px 32px -8px rgb(0 0 0 / 0.5)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
