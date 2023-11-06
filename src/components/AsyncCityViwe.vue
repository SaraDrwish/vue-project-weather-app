<template>
  <div>

  </div>
</template>

<script setup>

import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
// const weatherKey = ad546a042738f95641d2d2e5575652d3;

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(`
  https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}
  &exclude={part}&appid=ad546a042738f95641d2d2e5575652d3&units=imperial`);

    //cal current data & time
    const localOfset = new Date().getTimezoneOffset() * 60000
    const utc = weatherData.data.current.dt * 1000 + localOfset

      weatherData.data.currentTime = utc +1000 * weatherData.data.timezone_offset

    // call hourly weather offset

    weatherData.data.hourly.array.forEach((hor) => {
      const utc = hour.dt * 1000 + localOfset
      hour.currentTime = utc  + 1000 * weatherData.data.timezone_offset
      
    });

     return weatherData
    
  }
  catch(e){
    console.log(e)
  }

}

const weatherData = await getWeatherData()
console.log(weatherData)

</script>
 