/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        customBlack: "#333437",
        customBlue: "#152259",
      },
      backgroundColor: {
        customBlue: "#152259",
      },
    },
  },
  plugins: [],
};
