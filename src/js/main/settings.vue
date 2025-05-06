<script setup>

const isOpen = defineModel("isOpen", { type: Boolean, required: true, default: false })
const close = () => {
  isOpen.value = false;
}
</script>
<template>

  <section class="">
  </section>

  <button @click="close">close</button>

</template>
