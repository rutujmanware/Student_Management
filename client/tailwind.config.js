/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'custom-brown': 'rgb(71, 10, 10)',
        'custom-red': 'rgb(178,28,14)',
        'custom-rose': 'rgb(203,14,64)',
        'custom-pink': 'rgb(188,79,94)',
        // Add more custom colors as needed
      },
      textColor: {
        'custom-blue': 'rgb(0, 0, 255)',
        'custom-red': 'rgb(255, 0, 0)',
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
}

