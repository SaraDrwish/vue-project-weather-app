<template>
  <div>
    <Suspense>
       <AsyncCityViwe />
       <template #fallback>
        <p class="text-white flex justify-center m-4 p-4 text-2xl ">
           <!-- loading from city viwe . vue ... -->
           <CityViweSkltn  />
        </p>
       </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityViwe from "../components/AsyncCityViwe.vue"
import CityViweSkltn from "../components/CityViweSkltn.vue"
</script>
 