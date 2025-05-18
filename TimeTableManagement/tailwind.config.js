/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./components/**/*.{js,jsx,ts,tsx}',"./App.js", "./index.js"],
  presets: [require("nativewind/preset")],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#F59E0B',
        background: '#F3F4F6',
        text: {
          DEFAULT: '#111827',
          muted: '#6B7280',
        },
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}