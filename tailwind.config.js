/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: "#3d5a80",
          secondary: "#DCA11D",
          light: "#98c1d9",
          background: "#e0fbfc",
          text: "#293241",
        },
      },
    },
  },
  plugins: [],
};
