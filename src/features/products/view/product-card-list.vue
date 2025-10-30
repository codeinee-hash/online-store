<script setup>
import ProductCard from './product-card.vue';

defineProps({
  products: Array,
  isFavorities: Boolean,
});

const emit = defineEmits(['addToFavorite', 'addToCart']);
</script>

<template>
  <div class="grid grid-cols-4 gap-10" v-auto-animate>
    <product-card
      v-for="product in products"
      :key="product.id"
      :image-url="product.imageUrl"
      :title="product.title"
      :price="product.price"
      :is-favorite="product.isFavorite"
      :is-added="product.isAdded"
      :on-favorite-click="isFavorities ? null : () => emit('addToFavorite', product)"
      :on-add-click="isFavorities ? null : () => emit('addToCart', product)"
    />
  </div>
</template>
