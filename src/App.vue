<script setup>
import AppHeader from '@/components/header.vue';
import ProductCardList from '@/components/product-card-list.vue';
</script>

<template>
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-18 pb-16">
    <app-header />

    <div class="flex flex-col px-14">
      <h2 class="text-3xl font-bold my-10">Все кроссовки</h2>

      <product-card-list />
    </div>
  </div>
</template>
