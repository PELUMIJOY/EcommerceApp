/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx, js}"],
    theme: {
      screens: {
        'xs': '360px',
        
        'sm': '640px',
  
        'md': '768px',
  
        'lg': '1024px',
  
        'xl': '1280px',
        
        'xxl': '1400',
  
        '2xl': '1536px',
      },
      fontFamily: {
          'avenir': ['Avenir']
      },
      minWidth:{
        '180':'45rem',
        '200':'50rem'
      },
    },
    extend: {spacing:{
      '84':'21rem',
      '88':'22rem',
      '92':'23rem',
      '100':'25rem',
      '108':'27rem',
      '120':'30rem',
      '124':'31rem',
      '128':'32rem',
      '132':'33rem',
      '136':'34rem',
      '140':'35rem',
      '144':'36rem',
      '148':'37rem',
      '152':'38rem',
    }},
    variants: {
      extend: {},
    },
  plugins: []
}
