import { requester } from '@/shared/lib/axios.js';

export function useProductActions(cartItems) {
  const addToCart = (item) => {
    if (!item.isAdded) {
      cartItems.value.push(item);
      item.isAdded = true;
      localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
    }
  };

  const removeFromCart = (item) => {
    if (item.isAdded) {
      cartItems.value = cartItems.value.filter((i) => i.id !== item.id);
      item.isAdded = false;
      localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
    }
  };

  const syncWithLocalStorage = () => {
    const localCartItems = localStorage.getItem('cartItems');
    if (localCartItems) {
      cartItems.value = JSON.parse(localCartItems);
    }
  };

  const addToFavorite = async (item, productsRef) => {
    try {
      if (!item.isFavorite) {
        const { data } = await requester.post('favorites', { product_id: item.id });
        productsRef.value = productsRef.value.map((p) =>
          p.id === item.id ? { ...p, isFavorite: true, favoriteId: data.id } : p,
        );
      } else {
        await requester.delete(`favorites/${item.favoriteId}`);
        productsRef.value = productsRef.value.map((p) =>
          p.id === item.id ? { ...p, isFavorite: false, favoriteId: null } : p,
        );
      }
    } catch (error) {
      console.error('Ошибка при работе с избранным:', error);
    }
  };

  return { addToCart, removeFromCart, addToFavorite, syncWithLocalStorage };
}
