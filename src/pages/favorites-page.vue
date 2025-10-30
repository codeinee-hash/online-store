<script setup>
import { onMounted, ref } from 'vue';
import { requester } from '@/shared/lib/axios.js';
import PageTitle from '@/shared/ui/page-title.vue';
import { ProductCardList } from '@/features/products';

const favorites = ref([]);

onMounted(async () => {
  try {
    const { data } = await requester.get('/favorites?_relations=products');
    favorites.value = data.map((item) => item.product);
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <page-title title="Мои закладки" back-btn />
  <product-card-list :products="favorites" is-favorities />
</template>
