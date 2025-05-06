<script setup>
const props = defineProps({
  label: { type: String, required: true }
})
</script>

<template>
  <button class="bg-[#FD0041] hover:bg-[#0000C2] transition-all text-white rounded-2xl px-2 py-2">
    <span class="font-semibold">{{ label }}</span>
  </button>
</template>
