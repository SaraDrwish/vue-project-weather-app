
<template>
  <main class="container text-white">
    <h1 class="p-4 my-9 text-center text-2xl">Home view</h1>
    <div class="p-4 m-6 relative">
      
      <input type="text"
       v-model="searchQuery"
       @input="getSearchResults"
       placeholder="search for a city "
       class="py-2 px-1 bg-transparent w-full border-b
        focus:outline-none focus:shadow-[0px_2px_0px_0px_#004E71] focus:bg-weather-secondary " >

        <ul class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[77px]"
        v-if="mapboxSearchResults"
        >
          <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
           class="py-2 curser-pointer ">
           {{ searchResult.place_name }}
          </li>
        </ul>

    </div>
    
  </main>
</template>


<script setup>

import { ref } from "vue";
import axios from "axios"


const mapboxApiKey = "pk.eyJ1Ijoic2FhcmFhYWRlbGwiLCJhIjoiY2xrYjczZGc0MDF2aDNscGZmMTR4cXNqNCJ9.dQpvJrHSPa5FuzmmrkvPsw"
const searchQuery = ref("");
const queryTimeout = ref(null)
const mapboxSearchResults = ref(null)

const getSearchResults = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout( async () => {
    if (searchQuery.value !== "") {
      const result =
        await
  axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxApiKey}&types=place`);
      mapboxSearchResults.value = result.data.featuers;
      console.log(mapboxSearchResults.value)
      return;

    }
    mapboxSearchResults.value = null 


  } , 300 )
}


</script>


