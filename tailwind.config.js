/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        customBlack: "#8C89B4",
        customBlue: "#141332",
        customBlue2: "#1D1D41",
        customBlue3: "#3A3A65",
        customLightBlue: "#6359E9",
        customPlaceholder: "#27264E",
      },
      backgroundColor: {
        customBlue: "#141332",
        customBlue2: "#1D1D41",
        customBlue3: "#3A3A65",
        customLightBlue: "#6359E9",
        customPlaceholder: "#27264E",
      },
      borderColor: {
        customBlue: "#141332",
        customBlue2: "#1D1D41",
        customBlue3: "#3A3A65",
        customLightBlue: "#6359E9",
        customPlaceholder: "#27264E",
      },
    },
  },
  plugins: [],
};
