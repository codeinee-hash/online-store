<script setup>
import { AppAppHeader } from '@/features/header';
import { ProductCardList } from '@/features/products';
import { BasketSideDrawer } from '@/features/basket';
import { computed, onMounted, provide, reactive, ref, watch } from 'vue';
import { requester } from '@/shared/lib/axios.js';
import PageTitle from '@/shared/ui/page-title.vue';

const drawerOpen = ref(false);
const isCreatingOrder = ref(false);
const products = ref([]);
const cartItems = ref([]);

const filters = reactive({
  sortBy: 'title',
  searchQuery: '',
});

const totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price, 0));
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100));
const cartButtonDisabled = computed(() => (isCreatingOrder.value ? true : totalPrice.value === 0));
const isBasketEmpty = computed(() => cartItems.value.length === 0);

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
  try {
    if (!item.isFavorite) {
      const { data } = await requester.post('favorites', { productId: item.id });
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

const addToCart = (item) => {
  cartItems.value.push(item);
  item.isAdded = true;
};

const removeFromCart = (item) => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1);
  item.isAdded = false;
};

const onClickAdd = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }

  console.log(cartItems);
};

const createOrder = async () => {
  try {
    isCreatingOrder.value = true;
    const { data } = await requester.post('orders', {
      items: cartItems.value,
      totalPrice: totalPrice.value,
    });

    cartItems.value = [];
    return data;
  } catch (error) {
    console.log(error);
  } finally {
    isCreatingOrder.value = false;
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
watch(cartItems, () => localStorage.setItem('cartItems', JSON.stringify(cartItems.value)), {
  deep: true,
});

const onChangeSelect = (e) => (filters.sortBy = e.target.value);
const onChangeSearchInput = (e) => (filters.searchQuery = e.target.value);

provide('basketState', {
  openDrawer: () => (drawerOpen.value = true),
  closeDrawer: () => (drawerOpen.value = false),
  products: cartItems,
  addToCart,
  removeFromCart,
});
</script>

<template>
  <basket-side-drawer
    v-if="drawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    :is-creating-order="isCreatingOrder"
    :buttonDisabled="cartButtonDisabled"
    :is-basket-empty="isBasketEmpty"
    @create-order="createOrder"
  />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-18 pb-16">
    <app-app-header :total-price="totalPrice" />

    <div class="flex flex-col px-14">
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

      <product-card-list
        :products="products"
        @add-to-favorite="addToFavorite"
        @add-to-cart="onClickAdd"
      />
    </div>
  </div>
</template>
