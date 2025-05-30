/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}", // 关键在这行，扫描 src 中所有常见文件类型
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
