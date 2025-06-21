/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#4A90E2',
          600: '#3b82f6',
          700: '#1d4ed8',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#A18CD1',
          600: '#8b5cf6',
          700: '#7c3aed',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#7ED6C1',
          600: '#10b981',
          700: '#047857',
        },
        background: '#F5F7FB',
        surface: '#FAFAFA',
        coral: '#FF6B6B',
        warm: '#FDE68A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Nunito', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
};