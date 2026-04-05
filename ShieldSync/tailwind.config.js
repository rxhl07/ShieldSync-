/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#F5F5F3',
          dark: '#0A0A0B',
          card: '#FFFFFF',
          'card-dark': '#141418',
          elevated: '#FAFAF8',
          'elevated-dark': '#1A1A1F',
        },
        border: {
          DEFAULT: '#E2E2DD',
          dark: '#2A2A30',
        },
        text: {
          primary: '#0A0A0A',
          secondary: '#6B6B6B',
          tertiary: '#9B9B9B',
          'primary-dark': '#F5F5F3',
          'secondary-dark': '#A0A0A8',
        },
        accent: {
          DEFAULT: '#2D5BFF',
          hover: '#1A45E0',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
