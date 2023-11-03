<template>
  <div class=" absolute w-full bg-darkGray bg-opacity-9 h-screen top-0 flex justify-center px-9 ">
     <div class="p-4 bg-white self-start  mt-32 max-w-screen-md ">
        <slot />
        <button class="text-white mt-8 bg-weather-primary py-2 px-6 "> close </button>
     </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>