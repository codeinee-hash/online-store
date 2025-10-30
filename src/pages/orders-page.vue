<script setup>
import PageTitle from '@/shared/ui/page-title.vue';
import { ProductCardList } from '@/features/products';
import InfoBlock from '@/shared/ui/info-block.vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useOrders } from '@/features/products/model/use-orders.js';

const router = useRouter();
const { fetchOrders, isPending, orders } = useOrders();

onMounted(fetchOrders);
</script>

<template>
  <div v-if="isPending" class="w-full flex justify-center items-center py-20">
    <span class="text-gray-500 text-lg animate-pulse">Загрузка...</span>
  </div>

  <div v-else-if="orders.length > 0">
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
  </div>

  <div v-else class="w-full h-full flex items-center justify-center mt-20">
    <info-block
      title="У вас нет заказов"
      subtitle="Вы нищеброд? Оформите хотя бы один заказ."
      image="/emoji-2.png"
    >
      <button
        @click="() => router.back()"
        class="w-full py-3 rounded-xl bg-lime-500 mt-6 text-white font-semibold disabled:bg-slate-300 transition active:-translate-y-1 cursor-pointer"
      >
        Вернуться назад
      </button>
    </info-block>
  </div>
</template>
