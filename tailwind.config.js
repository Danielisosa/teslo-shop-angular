/** @type {import('tailwindcss').Config} */
module.exports={
  content:[
    "./src/**/*.{html,ts}",
  ],
  theme:{
    container: {
      center: true,
      padding: '1rem'
    },
    fontFamily:{
      'montserrat': ['Montserrat', 'sans-serif']
    },
    extend:{
      colors: {
        primary: 'var(--color-primary)',
        'primary-focus': 'var(--color-primary-focus)',
        accent: 'var(--color-accent)',
        neutral: 'var(--color-surface)',
        'base-100': 'var(--color-bg)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)'
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)'
      },
      spacing: {
        'xxs': 'var(--space-xxs)',
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)'
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100': { opacity: 1}
        }
      }
    },
  },
  plugins:  [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        dashstore: {
          "primary": "#2563EB",
          "primary-focus": "#1E40AF",
          "secondary": "#06B6D4",
          "accent": "#06B6D4",
          "neutral": "#111827",
          "base-100": "#0F1724",
          "info": "#2563EB",
          "success": "#16A34A",
          "warning": "#F59E0B",
          "error": "#EF4444"
        }
      }
    ]
  }
}
