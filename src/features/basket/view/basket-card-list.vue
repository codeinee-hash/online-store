<script setup>
import BasketCard from './basket-card.vue';
import { inject } from 'vue';

const { products, removeFromCart } = inject('basketState');
console.log('products in basket:', products.value);
</script>

<template>
  <div v-auto-animate class="flex flex-col gap-4">
    <basket-card
      v-for="product in products"
      :key="product.id"
      :title="product.title"
      :price="product.price"
      :image-url="product.imageUrl"
      @on-remove-click="() => removeFromCart(product)"
    />
  </div>
</template>
