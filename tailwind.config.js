 module.exports = {
  content: [ "./index.html" , "./src/**/*.{vue,js,ts,jsx,tsx}" ],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#4b5d6d",
        "weather-secondary": "#916f91"
      }
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "2rem",
      center:true
    },
    screens: {
      sm: "640px",
      md:"768px"
    }
  },
  plugins: [],
}

