<script setup>
import { inject, onMounted, watch } from 'vue';
import {
  ProductCardList,
  useProductActions,
  useProductFilters,
  useProducts,
} from '@/features/products';
import PageTitle from '@/shared/ui/page-title.vue';

const { cartItems } = inject('basketState');

const { products, isPending, loadProducts, syncWithFavorites } = useProducts();
const { filters, onChangeSelect, onChangeSearchInput } = useProductFilters(loadProducts);
const { addToCart, removeFromCart, syncWithLocalStorage, addToFavorite } =
  useProductActions(cartItems);

onMounted(async () => {
  syncWithLocalStorage();
  await loadProducts({ sortBy: filters.sortBy });

  products.value = products.value.map((product) => ({
    ...product,
    isAdded: cartItems.value.some((item) => item.id === product.id),
  }));
});

watch(cartItems, () => {
  products.value = products.value.map((item) => ({
    ...item,
    isAdded: cartItems.value.some((cartItem) => cartItem.id === item.id),
  }));
});

watch(
  () => products.value.map((p) => p.isFavorite),
  () => syncWithFavorites(),
  { deep: true },
);

const onClickAdd = (item) => (item.isAdded ? removeFromCart(item) : addToCart(item));
const onAddToFavorite = (item) => addToFavorite(item, products);
</script>

<template>
  <div class="flex justify-between items-center mb-10">
    <page-title title="Все кроссовки" />

    <div class="flex gap-4">
      <select
        @change="onChangeSelect"
        class="py-2 px-3 border border-gray-200 rounded-md outline-none"
      >
        <option value="name">По названию</option>
        <option value="price">По цене (дешевые)</option>
        <option value="-price">По цене (дорогие)</option>
      </select>

      <div class="relative">
        <img src="/search.svg" alt="search" class="absolute left-3.5 top-3" />
        <input
          @input="onChangeSearchInput"
          type="text"
          placeholder="Поиск..."
          class="border border-gray-200 rounded-md pl-10 pr-4 py-2 outline-none focus:border-gray-400"
        />
      </div>
    </div>
  </div>

  <div v-if="isPending" class="w-full flex justify-center items-center py-20">
    <span class="text-gray-500 text-lg animate-pulse">Загрузка...</span>
  </div>

  <product-card-list
    v-else
    :products="products"
    @add-to-favorite="onAddToFavorite"
    @add-to-cart="onClickAdd"
  />
</template>
