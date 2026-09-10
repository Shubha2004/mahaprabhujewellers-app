/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FBF8EE',
          100: '#F6F0DC',
          200: '#EDE0B9',
          300: '#E2CD8F',
          400: '#D7B965',
          500: '#C5A038',
          600: '#A68427',
          700: '#82641B',
          800: '#5E4714',
          900: '#3D2C0B',
          950: '#241905',
        },
        royal: {
          slate: '#0F172A',
          dark: '#090D16',
          wine: '#4A0E17',
          ruby: '#800020',
          emerald: '#0B3B2B'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.08), 0 0 1px 1px rgba(212, 175, 55, 0.15)',
      }
    },
  },
  plugins: [],
}
