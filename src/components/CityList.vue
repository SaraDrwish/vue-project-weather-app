<template>
  <div v-for="city in savedCities" :key="city.id" >
      <CityCard :city="city" @click="goCityViwe(city)" />
  </div>

  <p v-if="savedCities.length === 0 " class="capitalize p-4 mx-8 " >
    no location added yet 
  </p>

</template>

<script setup>

import CityCard from "./CityCard.vue"
import axios from "axios";
import { ref } from "vue";
import { useRoute , useRouter } from "vue-router";

const savedCities = ref([]);

const getCities = async () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(
      localStorage.getItem("savedCities")
    )

    const requests = []
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(`
    https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=ad546a042738f95641d2d2e5575652d3&units=imperia
        `)
      );
    });

    const weatherData = await Promise.all(requests);

    //Flicker delay 
    await new Promise((res) => setTimeout(res, 1000));

    weatherData.forEach((value ,index) => {
        savedCities.value[index].weather = value.data
    })

  }
};

await getCities();

const router = useRouter();

const goCityViwe = (city) => {
  router.push({
    name: "cityViwe",
    params: { state: city.state, city: city.city },
    query:{ id: city.id , lat:city.coords.lat , lng: city.coords.lng },
  })
}
  
</script>

 