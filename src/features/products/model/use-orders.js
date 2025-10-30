import { ref } from 'vue';
import { requester } from '@/shared/lib/axios.js';

export function useOrders() {
  const orders = ref([]);
  const isPending = ref(false);

  const fetchOrders = async () => {
    try {
      isPending.value = true;
      const { data } = await requester.get('/orders');
      orders.value = data;
    } catch (error) {
      console.log(error);
    } finally {
      isPending.value = false;
    }
  };

  return { orders, isPending, fetchOrders };
}
