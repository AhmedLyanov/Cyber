import { defineStore } from 'pinia';
import { cartApi } from '../api/cart.api';
import type { Cart } from './types';

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    cart: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    totalItems: (state) => {
      return state.cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    },
    totalPrice: (state) => {
      return state.cart?.total || 0;
    },
    hasItems: (state) => {
      return (state.cart?.items?.length || 0) > 0;
    },
    getItemQuantity: (state) => (productId: string) => {
      const item = state.cart?.items?.find(
        (item) => {
          // Проверяем, что productId может быть объектом или строкой
          const id = typeof item.productId === 'object' && item.productId !== null
            ? (item.productId as any)._id || item.productId
            : item.productId;
          return id === productId;
        }
      );
      return item?.quantity || 0;
    },
  },

  actions: {
    async fetchCart() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await cartApi.getCart();
        this.cart = response.cart || null;
      } catch (error: any) {
        this.error = error.message || 'Failed to load cart';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async addToCart(productId: string, quantity: number = 1) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await cartApi.addToCart({ productId, quantity });
        this.cart = response.cart || null;
        return response;
      } catch (error: any) {
        this.error = error.message || 'Failed to add to cart';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async removeFromCart(productId: string) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await cartApi.removeFromCart(productId);
        this.cart = response.cart || null;
        return response;
      } catch (error: any) {
        this.error = error.message || 'Failed to remove from cart';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async updateQuantity(productId: string, quantity: number) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await cartApi.updateQuantity({ productId, quantity });
        this.cart = response.cart || null;
        return response;
      } catch (error: any) {
        this.error = error.message || 'Failed to update quantity';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async clearCart() {
      this.isLoading = true;
      this.error = null;

      try {
        await cartApi.clearCart();
        this.cart = null;
      } catch (error: any) {
        this.error = error.message || 'Failed to clear cart';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
  },
});