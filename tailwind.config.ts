import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'hsl(var(--ink))',
          dark: 'hsl(var(--ink-dark))',
          light: 'hsl(var(--ink-light))',
        },
        steel: {
          DEFAULT: 'hsl(var(--steel))',
          dark: 'hsl(var(--steel-dark))',
          light: 'hsl(var(--steel-light))',
        },
        frost: {
          DEFAULT: 'hsl(var(--frost))',
          50: 'hsl(var(--frost-50))',
          100: 'hsl(var(--frost-100))',
          200: 'hsl(var(--frost-200))',
        },
        volt: {
          DEFAULT: 'hsl(var(--volt))',
          dark: 'hsl(var(--volt-dark))',
          light: 'hsl(var(--volt-light))',
        },
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      borderRadius: {
        lg: 'var(--radius)',
      },
    },
  },
  plugins: [],
};

export default config;
