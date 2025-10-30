<script setup>
import { inject } from 'vue';

defineProps({
  totalPrice: Number,
});

const basketState = inject('basketState');
</script>

<template>
  <header class="flex items-center justify-between border-b border-b-slate-300 px-14 py-11">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/logo.png" alt="logo" class="w-10 h-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-gray-400">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-8">
      <li
        @click="basketState.openDrawer"
        class="flex items-center gap-2.5 text-gray-500 hover:text-black cursor-pointer"
      >
        <img src="/cart.svg" alt="cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>

      <router-link to="/favorites">
        <li class="flex items-center gap-2.5 text-gray-500 hover:text-black cursor-pointer">
          <img src="/heart.svg" alt="heart" />
          <span>Закладки</span>
        </li>
      </router-link>

      <router-link to="/orders">
        <li class="flex items-center gap-2.5 text-gray-500 hover:text-black cursor-pointer">
          <img src="/profile.svg" alt="profile" />
          <span>Покупки</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
