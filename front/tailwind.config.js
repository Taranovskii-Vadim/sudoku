/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        9: 'repeat(9, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};
