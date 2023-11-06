<template>
  <div class="flex flex-col items-center flex-1">

    <!-- banner -->

    <div v-if="route.query.preview" class="text-white p-4 
     bg-weather-secondary w-full text-center 
    ">
    curently preveiwing city ,  click + .
    </div>

  <!-- weather overvew --> 

  <div class="flex flex-col items-center text-white py-12 ">
    <h2 class="text-2xl mb-12 ">{{ route.params.city }}</h2>
    
    <p class="text-sm mb-8">
      
       {{ new Date(weatherData.currentTime).toLocaleDateString(
        "en-us",
        {
          weekday:"short",
          day:"2-digit",
          month:"long"
        }
       ) }}

        {{ new Date(weatherData.currentTime).toLocaleTimeString(
          "en-us",
          {
            weekday: "short" 
          }
        ) }}

    </p>

    <p class="text-8xl mb-8">
       {{ Math.round(weatherData.current.temp) }} &deg;
    </p>

    <p  >
      Feels Like , {{  Math.round(weatherData.current.feels_like) }}
    </p>

     <p class="capitalize">
         {{ Math.round(weatherData.current.weather[0].description ) }}
     </p>

     <img class="w-[150px] h-auto "  alt="img" :src=" `http://openweathermap.org/img/wn/
     ${weatherData.current.weather[0].icon}@2x.png` "  />

   </div>

   <hr class="border border-opacity-10 border-white w-full ">

   <!-- hourly weather  -->

   <div class="max-w-screen-md p-2 my-12 w-full ">
    <div class="mx-4 ">
        <h4 class="m-2">hourly weather :</h4>
        <div class="flex gap-8 overflow-x-scroll ">
          <div  v-for="hourData in weatherData.hourly" :key="hourData.dt" 
           class="flex flex-col gap-3 items-center ">
             <p class="whitespace-nowrap text-md ">
                {{ 
                  new Date(hourData.currentTime ).toLocaleTimeString(
                    "en-us",
                    {
                      hour: "numeric",
                    }
                  )
                }}
             </p>
             <img class="w-auto h-[50px] object-cover "
              :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`" alt="icon" />

              <p class="text-xl">
                {{ Math.round(hourData.temp) }}&deg;
              </p>
          </div>
        </div>
    </div>
       
   </div>

   <hr class="border border-opacity-10 border-white w-full ">

   <!-- weekly weather -->

   <div class="max-w-screen-md p-2 my-12 w-full">
     <div class="text-white mx-8">
      <h2 class="mb-4 "> 7 days Forcast </h2>
      <div v-for="day in weatherData.daily " :key="day.dt"
       class="flex items-center">

       <p class="flex-1">
         <!-- {{ 
           new Date(day.dt * 1000).toLocaleDateString(
            "en-us",
            {
              weekly:"long"
            }
           )
         }}  -->
         {{
           new Date(day.dt * 1000).toLocaleDateString(
             "en-us",
             {
               weekday: "long"
             }
           )
         }}
       </p>
       <img class="w-[50px] h-[50px] object-cover "
        :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt="icon" 
        />
        <div class="flex gap-2 flex-1 justify-end">
          <p > H :{{ Math.round(day.temp.max) }} </p>
          <p >L: {{ Math.round(day.temp.min) }} </p>
        </div>
        
      </div>

     </div>
   </div>


  </div>
</template>

<script setup>

import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
 
const getWeatherData = async () => {
  try {

    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude=part&appid=ad546a042738f95641d2d2e5575652d3&units=imperial`
    );

    //cal current data & time
    
    const localOffset = new Date().getTimezoneOffset() * 60000
    const utc = weatherData.data.current.dt * 1000 + localOffset

     weatherData.data.currentTime = utc +1000 * weatherData.data.timezone_offset

    // call hourly weather offset

    //   weatherData.data.hourly.array.forEach((hour) => {
    //   const utc = hour.dt * 1000 + localOffset
    //   hour.currentTime = utc  + 1000 * weatherData.data.timezone_offset
    // });

//     weatherData.data.hourly.forEach((hour) => {
//   const utc = hour.dt * 1000 + localOffset;
//   hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    // });

    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
  

     return weatherData.data
    
  }
  catch(e){
    console.log(e)
  }

}

const weatherData = await getWeatherData()
console.log(weatherData)

</script>
 