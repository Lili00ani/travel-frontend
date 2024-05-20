/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    flowbite.content(),
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      width: {
        90: "90vw",
        80: "80vw",
      },
      height: {
        1000: "300vh",
      },
      textDecorationThickness: {
        20: "20px",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
