import { ref } from 'vue';
import { requester } from '@/shared/lib/axios.js';

export function useProducts() {
  const products = ref([]);
  const isPending = ref(false);

  const fetchProducts = async (params = {}) => {
    try {
      isPending.value = true;
      const { data } = await requester.get('products', { params });
      products.value = data.map((product) => ({
        ...product,
        isAdded: false,
        isFavorite: false,
        favoriteId: null,
      }));
    } catch (error) {
      console.error('Ошибка загрузки продуктов:', error);
    } finally {
      isPending.value = false;
    }
  };

  const syncWithFavorites = async () => {
    try {
      const { data } = await requester.get('favorites');
      products.value = products.value.map((product) => {
        const favorite = data.find((f) => f.product_id === product.id);
        if (favorite) {
          return {
            ...product,
            isFavorite: true,
            favoriteId: favorite.id,
          };
        }
        return product;
      });
    } catch (error) {
      console.error('Ошибка синхронизации избранного:', error);
    }
  };

  const loadProducts = async (params = {}) => {
    await fetchProducts(params);
    await syncWithFavorites();
  };

  return {
    products,
    isPending,
    fetchProducts,
    syncWithFavorites,
    loadProducts,
  };
}
