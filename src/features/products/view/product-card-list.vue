<script setup>
import ProductCard from './product-card.vue';

const handleClick = () => {
  alert('clicked');
};
</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <product-card
      image-url="/sneakers/sneakers-1.jpg"
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      :price="12999"
      :on-add-click="handleClick"
    />
    <product-card
      image-url="/sneakers/sneakers-2.jpg"
      title="Мужские Кроссовки Nike Air Max 270"
      :price="12999"
      is-added
    />
  </div>
</template>
