<script setup>
import { AppAppHeader } from '@/features/header';
import { BasketSideDrawer } from '@/features/basket';
import { computed, provide, ref, watch } from 'vue';

const drawerOpen = ref(false);
const cartItems = ref([]);

const totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price, 0));

const addToCart = (item) => {
  cartItems.value.push(item);
  item.isAdded = true;
};

const removeFromCart = (item) => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1);
  item.isAdded = false;
};

watch(cartItems, () => localStorage.setItem('cartItems', JSON.stringify(cartItems.value)), {
  deep: true,
});

provide('basketState', {
  openDrawer: () => (drawerOpen.value = true),
  closeDrawer: () => (drawerOpen.value = false),
  cartItems,
  addToCart,
  removeFromCart,
});
</script>

<template>
  <basket-side-drawer v-if="drawerOpen" :total-price="totalPrice" />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-18 pb-16">
    <app-app-header :total-price="totalPrice" />

    <div class="flex flex-col px-14">
      <router-view></router-view>
    </div>
  </div>
</template>
