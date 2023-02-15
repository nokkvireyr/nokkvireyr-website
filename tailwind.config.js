/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-color': {
          '50': '#f3f7fc',
          '100': '#e7f0f7',
          '200': '#c9deee',
          '300': '#9ac3df',
          '400': '#64a3cc',
          '500': '#4088b7',
          '600': '#2f6d9a',
          '700': '#3d464d',
          '800': '#252f37',
          '900': '#0d1821',
        },
        'dark-text': {
          '100': '#e7e8e9',
          '200': '#cfd1d3',
          '300': '#b6babc',
          '400': '#9ea3a6'
        },
        'amaranth': {
          '50': '#fff1f3',
          '100': '#fee5e8',
          '200': '#fccfd6',
          '300': '#faa7b4',
          '400': '#f7758d',
          '500': '#ef4266',
          '600': '#db2352',
          '700': '#b91745',
          '800': '#9b1640',
          '900': '#84173c',
        },
      }
    },
  },
  plugins: [],
}
