<script setup>
import ProductCard from './product-card.vue';

defineProps({
  products: Array,
});
</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <product-card
      v-for="product in products"
      :key="product.id"
      :image-url="product.imageUrl"
      :title="product.title"
      :price="product.price"
    />
  </div>
</template>
