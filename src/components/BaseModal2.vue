<template>
  <Teleport to="body">
    <Transition name="modal-outer">
      <div v-show="modalActive"
       class="absolute w-full bg-gray bg-opacity-30 h-screen top-0 left-0 flex justify-center px-6 ">
      <Transition name="model-inner">
          <div v-if="modalActive" class="p-2 bg-white self-start mt-22 max-w-screen-md ">
              <slot />
              <button @click="$emit('close-modal')" class="text-white mt-4 bg-weather-primary py-2 px-2 "> Close </button>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
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

<style  scoped>

.modal-outer-enter-active , .modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.25,0.02,0.19,1.02);
}
.modal-outer-enter-from , .modal-outer-leave-to {
  opacity: 0;
 }


 .modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.25,0.02,0.19,1.02) 0.15s ;
}
  .modal-inner-leave-active {
   transition: all 0.3s cubic-bezier(0.25,0.02,0.19,1.02)  ;
 }
 .modal-inner-enter-from   {
  opacity: 0;
  transform: scale(0.8);
 }
  .modal-inner-leave-to {
 
  transform: scale(0.8);
 }


</style>