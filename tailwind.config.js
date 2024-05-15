/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: ["./src/**/*.{ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      width: {
        90: "90vw",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
