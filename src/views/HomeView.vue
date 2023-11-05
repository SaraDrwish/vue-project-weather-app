
<template>
  <main class="container text-white">
    <h1 class="p-4 my-9 text-center text-2xl">Home view</h1>
    <div class="p-4 m-6 relative">
      <input type="text"
       v-model="searchQuery"
       @input="getSearchResults"
       placeholder="search for a city "
       class="py-2 px-1 bg-transparent w-full border-b
        focus:outline-none focus:shadow-[0px_2px_0px_0px_#004E71] focus:bg-red " >
       
        <ul class="absolute bg-red text-white w-full shadow-md py-2 px-1 top-[68px]"
        v-if="mapboxSearchResults"
        >
          <p v-if="searchError">something is goming wrong </p>
          <p v-if="!serverError && mapboxSearchResults.length === 0" >no results match your query  </p>
          <template v-else>
            <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
             class="py-2 curser-pointer ">
             {{ searchResult.place_name }}
            </li>
          </template>
        </ul>
    </div>
  </main>
</template>

<script setup>

import { ref } from "vue";
import axios from "axios"

const mapboxApiKey = "pk.eyJ1Ijoic2FhcmFhYWRlbGwiLCJhIjoiY2xvbHVuOGl6Mm1kNTJzcndsdGg2ODZvNSJ9.Q_EIYu5r-osuXlNy_b-HEA"
const searchQuery = ref("");
const queryTimeout = ref(null)
const mapboxSearchResults = ref(null)
const searchError = ref(null)

const getSearchResults = () => {
  clearTimeout(queryTimeout.value)
  queryTimeout.value = setTimeout( async () => {
    if (searchQuery.value !== "") {
      try {
         const result = await
          axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxApiKey}&types=place`);
        mapboxSearchResults.value = result.data.featuers;
        console.log(mapboxSearchResults.value)
      }
      catch (e) {
        console.log("eror" + e)
        searchEroor.value = true
        
      }
      return;     
    }
    mapboxSearchResults.value = null 
  } , 300 )
}

</script>


