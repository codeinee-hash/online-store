<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onAddClick: Function,
  onFavoriteClick: Function,
});
</script>

<template>
  <div
    class="relative border border-slate-100 bg-white rounded-2xl cursor-pointer p-7 hover:-translate-y-2 hover:shadow-xl transition duration-200 ease-in-out"
  >
    <img
      v-if="onFavoriteClick"
      :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
      alt="like 2"
      class="absolute top-7 left-7"
      @click="onFavoriteClick"
    />
    <img :src="imageUrl" alt="sneaker-1" />
    <p>{{ title }}</p>

    <div class="flex items-center justify-between">
      <div class="flex flex-col mt-4">
        <span class="text-gray-300">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>

      <img
        v-if="onAddClick"
        :src="isAdded ? '/checked.svg' : '/plus.svg'"
        alt="plus"
        @click="onAddClick"
      />
    </div>
  </div>
</template>
