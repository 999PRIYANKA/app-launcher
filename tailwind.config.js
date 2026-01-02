/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f7fbfd',
        secondary: '#2149a9',
        'primary-dark': '#e6f3f8',
        'secondary-dark': '#1a3a8a',
        brand: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          'dark-blue': '#1e3a8a',
          'dark-blue-light': '#1e40af',
          teal: '#14b8a6',
        },
        'brand-dark-blue': '#0d2438',
        'brand-dark-blue-light': '#1a3a5a',
        'brand-teal': '#2dd4bf',
      },
      fontFamily: {
        'sans': ['Work Sans', 'sans-serif'],
        'work-sans': ['Work Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': '0.625rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
    },
  },
  plugins: [],
}

