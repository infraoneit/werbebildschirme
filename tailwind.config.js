/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/rechner/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        infra: { green: "#36B336", red: "#D72027", dark: "#1a1f2e" },
      },
    },
  },
  plugins: [],
};
