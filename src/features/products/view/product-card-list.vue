<script setup>
import ProductCard from './product-card.vue';

defineProps({
  products: Array,
});

const emit = defineEmits(['addToFavorite']);
</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <product-card
      v-for="product in products"
      :key="product.id"
      :image-url="product.imageUrl"
      :title="product.title"
      :price="product.price"
      :is-favorite="product.isFavorite"
      :on-favorite-click="() => emit('addToFavorite', product)"
    />
  </div>
</template>
