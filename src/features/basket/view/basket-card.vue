<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
});

const emit = defineEmits(['onRemoveClick']);
</script>

<template>
  <div class="w-full p-4 rounded-xl border border-slate-100 flex items-center gap-5 relative">
    <img :src="imageUrl" :alt="title" class="w-[70px] h-[70px]" />

    <div class="flex flex-col gap-2 text-sm">
      <p>{{ title }}</p>
      <b>{{ price }} руб.</b>
    </div>
    <img
      @click="emit('onRemoveClick')"
      src="/close.svg"
      alt="close"
      class="cursor-pointer absolute right-4 bottom-4 opacity-50 hover:opacity-100 transition active:-translate-y-1"
    />
  </div>
</template>
