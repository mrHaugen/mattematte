/** @type {import('tailwindcss').Config}*/
const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-rounded', '"Hiragino Maru Gothic ProN"', 'Quicksand', 'Comfortaa', ...defaultTheme.fontFamily.sans]
      }
    }
  },

  plugins: []
};

module.exports = config;
