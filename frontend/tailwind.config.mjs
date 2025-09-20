/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0C5C45',
        'dark-blue': '#013F54',
        green: '#5BA529',
        'off-white': '#FCFCF7',
        'soft-orange': '#C89364',
        beige: '#C89364',
      },
    },
  },
  plugins: [],
};

export default config;
