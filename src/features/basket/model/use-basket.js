import { computed, ref } from 'vue';
import { requester } from '@/shared/lib/axios.js';

export function useBasket(cartItems, totalPrice) {
  const isCreatingOrder = ref(false);
  const orderId = ref(null);

  const isBasketEmpty = computed(() => cartItems.value.length === 0);
  const vatPrice = computed(() => Math.round((totalPrice * 5) / 100));
  const buttonDisabled = computed(() =>
    isCreatingOrder.value ? true : cartItems.value.length === 0,
  );

  const createOrder = async () => {
    try {
      isCreatingOrder.value = true;
      const { data } = await requester.post('orders', {
        items: cartItems.value,
        totalPrice,
      });

      cartItems.value = [];
      orderId.value = data.id;
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      isCreatingOrder.value = false;
    }
  };

  return { orderId, isCreatingOrder, createOrder, isBasketEmpty, vatPrice, buttonDisabled };
}
