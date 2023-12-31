/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        "warm-white":"#FAECD8",
        "black-green":"#161A17",
        "gray-green":"#252d26",
        "bright-blue": "#0EF1FF",
        "bright-green": "#16FF58",
        "bright-yellow": "#FF9F0E",
        "bright-purple": "#CD29F6",
        "bright-red": "#FF2056",
        "bright-pink": "#ff20b8",
        "bright-sage": "#20ffa6"
      },
      fontFamily: {
        'satoshi': ["Satoshi-Variable", "san-serif"],
        'satoshiItalic': ["Satoshi-VariableItalic", "san-serif"],
      }
    },
  },
  plugins: [],
}
