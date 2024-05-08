/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: ["./src/**/*.{ts,tsx}", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
