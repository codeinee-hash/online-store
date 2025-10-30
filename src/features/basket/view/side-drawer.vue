<script setup>
import DrawerHead from './drawer-head.vue';
import BasketCardList from './basket-card-list.vue';
import InfoBlock from '@/shared/ui/info-block.vue';
import { inject } from 'vue';
import { useBasket } from '../model/use-basket.js';

const props = defineProps({
  totalPrice: Number,
});

const { cartItems } = inject('basketState');
const { orderId, isBasketEmpty, buttonDisabled, vatPrice, createOrder } = useBasket(
  cartItems,
  props.totalPrice,
);
</script>

<template>
  <div class="fixed top-0 left-0 z-10 w-full h-full bg-black/70">
    <div class="fixed w-96 h-full bg-white right-0 top-0 z-20 p-8">
      <drawer-head />

      <div v-if="isBasketEmpty || orderId" class="h-full flex items-center">
        <info-block
          v-if="isBasketEmpty && !orderId"
          title="Корзина пустая"
          subtitle="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
          image="/package-icon.png"
        />
        <info-block
          v-if="orderId"
          title="Заказ оформлен!"
          :subtitle="`Ваш заказ #${orderId} скоро будет передан курьерской доставке`"
          image="/order-success-icon.png"
        />
      </div>

      <div v-else>
        <basket-card-list />

        <div class="flex flex-col gap-4 mt-10">
          <div class="flex gap-2 text-base">
            <span>Итого:</span>
            <div class="flex-1 border-b border-b-slate-200 border-dashed mb-1.5"></div>
            <b>{{ totalPrice }} ₽</b>
          </div>
          <div class="flex gap-2 text-base">
            <span>Налог 5%:</span>
            <div class="flex-1 border-b border-b-slate-200 border-dashed mb-1.5"></div>
            <b>{{ vatPrice }} ₽</b>
          </div>
          <button
            :disabled="buttonDisabled"
            @click="createOrder"
            class="w-full py-3 rounded-xl bg-lime-500 mt-2 text-white font-semibold disabled:bg-slate-300 transition active:-translate-y-1 cursor-pointer"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
