/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          900: '#0a0a0a',
          800: '#141414',
          700: '#1f1f1f',
          600: '#2b2b2b',
          500: '#3d3d3d',
          400: '#595959',
        },
        cream: {
          50: '#fdfcfa',
          100: '#faf9f6',
          200: '#f5f3ee',
          300: '#ebe7df',
        },
        accent: {
          50: '#fdf6ed',
          100: '#f9e8cc',
          200: '#f0cd94',
          300: '#e6b25c',
          400: '#d99a34',
          500: '#c8862d',
          600: '#a86a22',
          700: '#85521f',
          800: '#5e3a18',
          900: '#3a2410',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
