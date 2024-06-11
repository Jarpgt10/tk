/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '350px',
        md: '600px',
        lg: '1024px',
        xl: '1280px', // Puedes ajustar esta resolución si es necesario
      },
    },
  },
  plugins: [],
}
