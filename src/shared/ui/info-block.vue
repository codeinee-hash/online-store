<script setup>
defineProps({
  title: String,
  subtitle: String,
  image: String,
});
</script>

<template>
  <div class="w-72 mx-auto flex flex-col items-center">
    <img :src="image" :alt="title" width="100" height="100" />
    <h2 class="text-2xl font-semibold mb-2 mt-5">{{ title }}</h2>
    <p class="text-black/40 text-center">{{ subtitle }}</p>
    <slot />
  </div>
</template>
