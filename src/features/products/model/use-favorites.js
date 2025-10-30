import { ref } from 'vue';
import { requester } from '@/shared/lib/axios.js';

export function useFavorites() {
  const favorites = ref([]);
  const isPending = ref(false);

  const fetchFavorites = async () => {
    try {
      isPending.value = true;
      const { data } = await requester.get('/favorites?_relations=products');
      favorites.value = data.map((item) => item.product);
    } catch (error) {
      console.log(error);
    } finally {
      isPending.value = false;
    }
  };

  return { favorites, fetchFavorites, isPending };
}
