<script setup>
import DrawerHead from './drawer-head.vue';
import BasketCardList from './basket-card-list.vue';
import InfoBlock from '@/shared/ui/info-block.vue';
import { requester } from '@/shared/lib/axios.js';
import { computed, inject, ref } from 'vue';

const isCreatingOrder = ref(false);
const orderId = ref(null);

const props = defineProps({
  totalPrice: Number,
});

const { cartItems } = inject('basketState');

const isBasketEmpty = computed(() => cartItems.value.length === 0);
const buttonDisabled = computed(() =>
  isCreatingOrder.value ? true : cartItems.value.length === 0,
);
const vatPrice = computed(() => Math.round((props.totalPrice * 5) / 100));

const createOrder = async () => {
  try {
    isCreatingOrder.value = true;
    const { data } = await requester.post('orders', {
      items: cartItems.value,
      totalPrice: props.totalPrice,
    });

    cartItems.value = [];
    orderId.value = data.id;
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    isCreatingOrder.value = false;
  }
};
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
