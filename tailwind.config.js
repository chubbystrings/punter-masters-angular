/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      pri: {
        default: '#AD1457',
        50: '#EFD0DD',
        100: '#E4B1C7',
        200:'#D689AB',
        300: '#C8628F',
        400: '#BB3B73',
        500: '#901149',
        600: '#730D3A',
        700: '#570A2C',
        800: '#3A071D',
        900: '#230411',
        bg: '#FDF9FB'

      },
      sec: {
        default: '#473E2C',
        50: '#DAD8D5',
        100: '#C2BFB9',
        200:'#A39E95',
        300: '#847E72',
        400: '#665E4F',
        500: '#3B3425',
        600: '#2F291D',
        700: '#241F16',
        800: '#18150F',
        900: '#0E0C09',
      },
      accent: {
        default: '#FB8E0B',
        50: '#FEE8CE',
        100: '#FED9AE',
        200:'#FDC685',
        300: '#FCB45C',
        400: '#FCA134',
        500: '#D17609',
        600: '#A75F07',
        700: '#7E4706',
        800: '#542F04',
        900: '#321C02',
      },
      light: '#FEFDFE',
      dark: '#0E0C09',
      error: '#FB0D0D'
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/assets/umbrella.png')",
      }
    },
  },
  plugins: [],
}
