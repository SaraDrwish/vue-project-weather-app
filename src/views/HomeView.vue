
<template>
  <main class="container text-white">
     <div class="p-2 m-3 relative">
      <input type="text"
       v-model="searchQuery"
       @input="getSearchResults"
       placeholder="search for a city "
       class="py-2 px-1 bg-transparent w-full border-b
        focus:outline-none focus:shadow-[0px-2px-0px-0px-#004E71] bg-weather-primary " >
        <ul 
        class="absolute bg-weather-primary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults">  
          <p v-if="searchError">something is goming wrong </p>
          <p v-if="!serverError && mapboxSearchResults.length === 0" > no results match your query  </p>
          <template v-else>
            <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
             class="py-2 curser-pointer "
             @click="prevewCity(searchResult)"
             >
             {{ searchResult.place_name }}
            </li>
          </template>
        </ul>
    </div>

    <div class="flex flex-col gap-4">
       <Suspense>
           <CityList />
           <template #fallback>
             <p>Loading ......... </p>
           </template>
       </Suspense>
    </div>

  </main>
</template>

<script setup>

import { useRouter } from "vue-router";
import { ref } from "vue";
import axios from "axios";
import CityList from "../components/CityList.vue"
const router = useRouter();

const prevewCity = (searchResult) => {
  console.log(searchResult);
  const [city, state] = searchResult.place_name.split(",");
  console.log(city, state);
  router.push({
    name: "city",
    params: {state:state.replaceAll(" " , ""), city:city},
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true
    },
  });
};

const mapboxApiKey = "pk.eyJ1Ijoic2FhcmFhYWRlbGwiLCJhIjoiY2xvbHVuOGl6Mm1kNTJzcndsdGg2ODZvNSJ9.Q_EIYu5r-osuXlNy_b-HEA" ;
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

//missing
const serverError = ref(false);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await
          axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxApiKey}&types=place`);
        mapboxSearchResults.value = result.data.features;
        console.log(mapboxSearchResults.value);
      }
      catch {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
}

</script>


