/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // هنا بنضيف jsx و tsx
  ],
  theme: {
    extend: {
      colors: {
        // بما أنك بتبني DashBoard بريميوم، ممكن تضيف ألوان المنيو هنا
        gold: {
          light: '#FBF089',
          DEFAULT: '#D4AF37', // اللون الذهبي الأساسي
          dark: '#AA8A2E',
        },
        darkBg: '#050505', // خلفية سوداء فخمة
      },
    },
  },
  plugins: [],
}