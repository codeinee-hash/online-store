import { reactive, watch } from 'vue';
import { debounce } from '@/shared/lib/debounce.js';

export function useProductFilters(fetchProducts) {
  const filters = reactive({
    sortBy: 'title',
    searchQuery: '',
  });

  const onChangeSelect = (e) => {
    filters.sortBy = e.target.value;
  };

  const onChangeSearchInput = debounce((e) => {
    filters.searchQuery = e.target.value;
  }, 400);

  watch(
    filters,
    () => {
      const params = { sortBy: filters.sortBy };
      if (filters.searchQuery) {
        params.title = `*${filters.searchQuery}*`;
      }
      fetchProducts(params);
    },
    { deep: true },
  );

  return { filters, onChangeSelect, onChangeSearchInput };
}
