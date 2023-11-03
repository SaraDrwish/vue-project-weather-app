 module.exports = {
  content: [ "./index.html" , "./src/**/*.{vue,js,ts,jsx,tsx}" ],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#ds4845",
        "weather-secondary": "#jfdjfdkk"
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

