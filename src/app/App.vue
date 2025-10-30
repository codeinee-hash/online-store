<script setup>
import { AppHeader } from '@/features/header';
import { ProductCardList } from '@/features/products';
import { BasketSideDrawer } from '@/features/basket';
import { onMounted, reactive, ref, watch } from 'vue';
import { requester } from '@/shared/lib/axios.js';

const drawerOpen = ref(false);
const products = ref([]);

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
});

const fetchFavoriteProducts = async () => {
  try {
    const { data } = await requester.get('favorites');
    products.value = products.value.map((product) => {
      const favorite = data.find((f) => f.productId === product.id);

      if (!favorite) return product;

      return {
        ...product,
        isFavorite: true,
        favoriteId: favorite.id,
      };
    });
  } catch (error) {
    console.log(error);
  }
};

const fetchProducts = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    };

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }

    const { data } = await requester.get('products', { params });
    products.value = data.map((product) => ({
      ...product,
      isAdded: false,
      isFavorite: false,
      favoriteId: null,
    }));
  } catch (error) {
    console.log(error);
  }
};

const addToFavorite = async (item) => {
  item.isFavorite = !item.isFavorite;

  try {
    if (!item.isFavorite) {
      const { data } = await requester.post('favorites', { productId: item.id });
      item.favoriteId = data.id;
    } else {
      await requester.delete(`favorites/${item.favoriteId}`);
      item.favoriteId = null;
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await fetchProducts();
  await fetchFavoriteProducts();
});

watch(filters, fetchProducts);

const onChangeSelect = (e) => (filters.sortBy = e.target.value);
const onChangeSearchInput = (e) => (filters.searchQuery = e.target.value);
</script>

<template>
  <basket-side-drawer v-if="drawerOpen" />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-18 pb-16">
    <app-header />

    <div class="flex flex-col px-14">
      <div class="flex justify-between items-center mb-10">
        <h2 class="text-3xl font-bold my-10">Все кроссовки</h2>

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

      <product-card-list :products="products" @add-to-favorite="addToFavorite" />
    </div>
  </div>
</template>
