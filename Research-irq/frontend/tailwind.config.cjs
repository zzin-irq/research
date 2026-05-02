/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-muted': 'var(--color-surface-muted)',
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-faint': 'var(--color-text-faint)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        accent: 'var(--color-accent)',
        'accent-soft': 'var(--color-accent-soft)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        danger: 'var(--color-danger)'
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Crimson Pro', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['"Tajawal"', '"Cairo"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      maxWidth: {
        prose: '65ch',
        content: '1080px',
        wide: '1280px'
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px'
      }
    }
  },
  plugins: []
};
