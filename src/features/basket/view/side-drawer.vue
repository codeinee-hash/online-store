<script setup>
import DrawerHead from './drawer-head.vue';
import BasketCardList from './basket-card-list.vue';
</script>

<template>
  <div class="fixed top-0 left-0 z-10 w-full h-full bg-black/70">
    <div class="fixed w-96 h-full bg-white right-0 top-0 z-20 p-8">
      <drawer-head />
      <basket-card-list />

      <div class="flex flex-col gap-4">
        <div class="flex gap-2 text-base">
          <span>Итого:</span>
          <div class="flex-1 border-b border-b-slate-200 border-dashed mb-1.5"></div>
          <b>12990 ₽</b>
        </div>
        <div class="flex gap-2 text-base">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-b-slate-200 border-dashed mb-1.5"></div>
          <b>900 ₽</b>
        </div>
        <button
          class="w-full py-3 rounded-xl bg-lime-500 mt-2 text-white font-semibold disabled:bg-slate-300 transition active:-translate-y-1 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>
