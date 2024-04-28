/** @type {import("tailwindcss").Config} */

export default {
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainColor: {
          main: '#4A6A67',
          text: '#ED7A2E',
          icon: 'red',
          colorsCustom: '#303f3d',
          button: '#302D2D'
        }
      },
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        text: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
