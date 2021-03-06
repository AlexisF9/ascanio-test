/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#fabb3a",
        secondary: "#2ac0cc",
        secondaryLight: "#00DEDE24",
        dark: "#111419",
        darkBorder: "#31363e",
        darkLight: "#1f252e",
      },
      spacing: {
        "-10px": "-10px",
        "50%": "50%",
        "-50%": "-50%",
      },
      minWidth: {
        "500px": "500px",
      },
    },
  },
  plugins: [],
};
