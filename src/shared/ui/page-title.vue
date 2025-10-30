<script setup>
defineProps({
  title: String,
  backBtn: Boolean,
});
</script>

<template>
  <div class="flex gap-5 items-center">
    <button
      v-if="backBtn"
      class="rounded border border-gray-200 w-9 h-9 flex items-center justify-center active:-translate-y-1 transition cursor-pointer"
    >
      <img src="/arrow-right.svg" alt="close" class="rotate-180" />
    </button>
    <h2 class="text-3xl font-bold my-10">{{ title }}</h2>
  </div>
</template>
