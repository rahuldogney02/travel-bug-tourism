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
    brand: 'var(--color-primary)',
    dark: 'var(--color-dark-blue)',
    forest: 'var(--color-dark-green)',
    leaf: 'var(--color-green)',
    beige: 'var(--color-beige)',
    },
    animation: {
    backgroundShift: 'backgroundShift 20s ease-in-out infinite',
    fadeInUp: 'fadeInUp 1s ease-out 1s forwards',
    float: 'float 15s ease-in-out infinite',
    pageLoad: 'pageLoad 1s ease-out forwards',
    marquee: 'marquee 40s linear infinite',
    },
    keyframes: {
    backgroundShift: {
    '0%, 100%': {
    transform: 'translate(0, 0) rotate(0deg)',
    opacity: '0.8',
    },
    '25%': {
    transform: 'translate(-20px, -10px) rotate(1deg)',
    opacity: '0.6',
    },
    '50%': {
    transform: 'translate(10px, -20px) rotate(-0.5deg)',
    opacity: '0.9',
    },
    '75%': {
    transform: 'translate(-10px, 10px) rotate(0.5deg)',
    opacity: '0.7',
    },
    },
    fadeInUp: {
    from: {
    opacity: '0',
    transform: 'translateY(30px)',
    },
    to: {
    opacity: '1',
    transform: 'translateY(0)',
    },
    },
    float: {
    '0%, 100%': {
    transform: 'translateY(0px) rotate(0deg)',
    },
    '50%': {
    transform: 'translateY(-20px) rotate(5deg)',
    },
    },
    pageLoad: {
    from: {
    opacity: '0',
    transform: 'scale(0.9)',
    },
    to: {
    opacity: '1',
    transform: 'scale(1)',
    },
    },
    marquee: {
      '0%': { transform: 'translateX(100%)' },
      '100%': { transform: 'translateX(-200%)' },
    },
  },
  plugins: [],
};

export default config;
