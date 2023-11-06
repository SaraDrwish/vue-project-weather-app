<template>
  <div>
    <Suspense>
       <AsyncCityViwe />
       <template #fallback>
        <p>loading</p>
       </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityViwe from "../components/AsyncCityViwe.vue"
</script>
 