<script setup>
import { AppHeader } from '@/features/header';
import { ProductCardList } from '@/features/products';
</script>

<template>
  <!--  <basket-side-drawer />-->
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-18 pb-16">
    <app-header />

    <div class="flex flex-col px-14">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold my-10">Все кроссовки</h2>

        <div class="flex gap-4">
          <select class="py-2 px-3 border border-gray-200 rounded-md outline-none">
            <option value="">По названию</option>
            <option value="">По цене (дешевые)</option>
            <option value="">По цене (дорогие)</option>
          </select>

          <div class="relative">
            <img src="/search.svg" alt="search" class="absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Поиск..."
              class="border border-gray-200 rounded-md pl-10 pr-4 py-2 outline-none focus:border-gray-400"
            />
          </div>
        </div>
      </div>

      <product-card-list />
    </div>
  </div>
</template>
