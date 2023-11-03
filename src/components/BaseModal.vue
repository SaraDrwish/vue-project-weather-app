<template>
  <Transition>
    <div v-show="modalActive" class="absolute w-full bg-gray bg-opacity-30 h-screen top-0 left-0 flex justify-center px-9 ">
     <Transition>
        <div v-if="modalActive" class="p-4 bg-white self-start mt-32 max-w-screen-md ">
            <slot />
            <button @click="$emit('close-modal')" class="text-white mt-8 bg-weather-primary py-2 px-6 "> Close </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>

defineEmits(['close-modal'])

defineProps({
  modalActive: {
    type: Boolean,
    default: false,
      
    }
  })
</script>

<style lang="scss" scoped>

</style>