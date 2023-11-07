<template>
  <div class="flex flex-col flex-1">
<!-- overview -->
     <div class="flex flex-col py-12 items-center ">
        <AnimaPlac class="max-w-[300px] w-full mb-12 " />
        <AnimaPlac class="max-w-[300px] w-full mb-12 " />
        <AnimaPlac class="max-w-[300px] h-[100px] w-full mb-12 " />
        <AnimaPlac class="max-w-[300px] w-full mb-8 " />
        <AnimaPlac class="max-w-[300px]  h-[75px] w-full  " />
     </div>
   
  <!-- horly -->
      <div class="flex flex-col py-12 items-center ">
        <AnimaPlac class="max-w-screen-md h-[100px] w-full mb-12 " />
      </div>

    <!-- weekly -->
    <div class="flex flex-col py-12 items-center ">
      <AnimaPlac class="max-w-screen-md h-[100px] w-full mb-12 " />
    </div>

  </div>
</template>

<script setup >

    import AnimaPlac from "./AnimaPlac.vue"

</script>
