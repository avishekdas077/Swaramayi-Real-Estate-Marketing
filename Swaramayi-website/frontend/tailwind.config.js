/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#071A3D',
          800: '#0B3D91',
          700: '#144BB8',
          100: '#EBF1FF',
        },
        gold: {
          500: '#D4AF37',
          400: '#E8C766',
          600: '#B59226',
          50: '#FDFBF2',
        },
        dark: {
          900: '#111827',
          800: '#1F2937',
          700: '#374151',
        },
        light: {
          bg: '#F7F8FA',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 4px 14px 0 rgba(212, 175, 55, 0.25)',
        navy: '0 4px 20px 0 rgba(7, 26, 61, 0.15)',
      },
    },
  },
  plugins: [],
};
