<script setup>
import { inject, onMounted, reactive, ref, watch } from 'vue';
import { ProductCardList } from '@/features/products/index.js';
import PageTitle from '@/shared/ui/page-title.vue';
import { requester } from '@/shared/lib/axios.js';
import { debounce } from '@/shared/lib/debounce.js';

const products = ref([]);
const isPending = ref(false);
const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
});

const { addToCart, removeFromCart, cartItems } = inject('basketState');

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const { data } = await requester.post('favorites', { product_id: item.id });
      item.favoriteId = data.id;
      item.isFavorite = true;
    } else {
      await requester.delete(`favorites/${item.favoriteId}`);
      item.favoriteId = null;
      item.isFavorite = false;
    }
  } catch (error) {
    console.log(error);
  }
};

const onClickAdd = (item) => {
  if (!item.isAdded) addToCart(item);
  else removeFromCart(item);
};

const fetchFavoriteProducts = async () => {
  try {
    const { data } = await requester.get('favorites');
    products.value = products.value.map((product) => {
      const favorite = data.find((f) => f.product_id === product.id);

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
    isPending.value = true;
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
  } finally {
    isPending.value = false;
  }
};

onMounted(async () => {
  const localCartItems = localStorage.getItem('cartItems');
  cartItems.value = localCartItems ? JSON.parse(localCartItems) : [];

  await fetchProducts();
  await fetchFavoriteProducts();

  products.value = products.value.map((product) => ({
    ...product,
    isAdded: cartItems.value.some((item) => item.id === product.id),
  }));
});

watch(filters, fetchProducts);
watch(
  cartItems,
  () => (products.value = products.value.map((item) => ({ ...item, isAdded: false }))),
);

const onChangeSelect = (e) => (filters.sortBy = e.target.value);
const onChangeSearchInput = debounce((e) => (filters.searchQuery = e.target.value), 400);
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
    @add-to-favorite="addToFavorite"
    @add-to-cart="onClickAdd"
  />
</template>
