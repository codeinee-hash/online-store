<script setup>
import { onMounted, ref } from 'vue';
import { requester } from '@/shared/lib/axios.js';
import PageTitle from '@/shared/ui/page-title.vue';
import { ProductCardList } from '@/features/products';

const orders = ref([]);

onMounted(async () => {
  try {
    const { data } = await requester.get('/orders');
    orders.value = data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <page-title title="Мои покупки" back-btn />

  <div class="w-full flex flex-col gap-14">
    <div v-for="order in orders" :key="order.id" class="w-full">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-2xl font-semibold text-[#87C20A]">Заказ №{{ order.id }}</h3>
        <span
          >Итого: <b>{{ order.totalPrice }} ₽</b></span
        >
      </div>
      <product-card-list :products="order.items" is-favorities />
    </div>
  </div>
</template>
