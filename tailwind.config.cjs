/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'd-base': {
          1:'#334155',
          2:'#475466',
          3:'#707a88',
        },
        'd-vanilla':'#E1D89F',
        'd-old-rose':'#CD8B76',
        'd-magenta':'#C45BAA',
        'l-base':'#F5F5F4',
        'l-bittersweet':'#F05D5E',
        'l-oj':'#EA9010',
        'l-blue':'#3772FF',
      },
      animation: {
        wiggle: 'wiggle .3s ease-in-out infinite alternate',
        slideIn: 'slide 1s ease-in-out 1 forwards',
        slideOut: 'slide 1s ease-in-out 1 reverse forwards',
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        },
        slide: {
          '0%': { transform: 'translate(-11rem)' },
          '50%': { transform: 'translate(0rem)' },
        },
      }
    },
  },
  plugins: [],
}
