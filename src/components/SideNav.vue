<template>
   <header class=" sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6 uppercase">
    <RouterLink :to="{name:'home'}">
      <div class="flex items-center gap-3 ">
        <i class="fa-solid fa-sun text-2xl "></i>
        <p class="text-2xl">the local weather </p>
      </div>
    </RouterLink>
    <div  class="flex gap-4 flex-1 justify-end">
      <i  @click="toggleModal"  class="fa-solid fa-circle-info
       text-xl hover:text-weather-secondary duration-150
       cursor-pointer" > 
      </i>
      <i class="fa-solid fa-plus 
      text-xl hover:text-weather-secondary duration-150
       cursor-pointer " 
       @click="addCity"
       >
      </i>
    </div>

    <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
       
      <div class="text-weather-primary">
        <h2 class="text-xl mb-2">About</h2>
        <p>Lorem ipsum dolor sit amet io debitis voluptatibus reprehenderi</p>
        <h3 class="text-xl mb-2 ">How it works</h3>
        <ol class="list-decimal list-inside m-2 ">
          <li>search for your sity ............</li>
          <li>select for your sity ............</li>
          <li>track the city by clicking on + icon </li>
        </ol>
        <h3 class="text-xl mb-2 ">removing a city </h3>
        <p>Lorem ipsum dolor sit
           consectetur adipisicing
            amet consectetur adipisic. </p>
      </div>

    </BaseModal>

    </nav>
   </header>
</template>

<script setup>
import { RouterLink , useRoute, useRouter } from 'vue-router';
import BaseModal from "../components/BaseModal.vue"
import { ref } from 'vue';
import {uid} from "uid"


const savedCities = ref([])
const route = useRoute();
const router = useRouter();

const addCity = () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(
      localStorage.getItem('savedCities')
    )
  }
  const locationObject = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng:route.query.lng
    }

  }

  savedCities.value.push(locationObject)
  localStorage.setItem('savedCities', JSON.stringify(savedCities.value))
  let query = Object.assign({}, route.query)
  query.preview
  router.replace({query})
}

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = ! modalActive.value
}

</script>
