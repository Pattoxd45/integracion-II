/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite', // Cambié el tiempo a 3 segundos
      },
    },
  },
}
