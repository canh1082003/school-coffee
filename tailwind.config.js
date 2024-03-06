/** @type {import("tailwindcss").Config} */

export default {
  content: ['./src/**/*.{html,js,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainColor: {
          main: '#ff9900',
          text: '#ffcc6e',
          icon: 'red'
        }
      },
      fontFamily: {
        body: ['Poppins'],
        text: ['Inknut']
      }
    }
  },
  plugins: []
};
