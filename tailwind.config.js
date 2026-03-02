/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lilac: '#8B5CF6',
        softBg: '#F5F3FF',
        canvas: '#F8F7FF'
      },
      boxShadow: {
        soft: '0 14px 40px rgba(79, 70, 229, 0.15)'
      }
    }
  },
  plugins: []
};
