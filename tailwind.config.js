/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cupcake","corporate"],
    themes: ["light", "dark", "cupcake", "corporate"],
    base: false, 
    styled: true, 
    utils: true 
  },
  plugins: [
    require('daisyui'),
  ],
}