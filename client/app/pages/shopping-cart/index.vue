<template>
  <div class="flex justify-center gap-12 px-40 py-28">
    <div class="w-full">
      <Typography class="mb-10" variant="h3">
        Shopping Cart
      </Typography>


      <div v-if="errorMessage" class="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
        {{ errorMessage }}
        <button @click="fetchCart" class="ml-2 text-blue-600 hover:underline">
          Try Again
        </button>
      </div>

      <div v-if="isLoading && !cartStore.cart" class="flex justify-center py-20">
        <Typography variant="body1">Loading cart...</Typography>
      </div>

      <div v-else-if="!cartStore.hasItems" class="flex flex-col items-center justify-center py-20">
        <Typography variant="h4" class="mb-4">Your cart is empty</Typography>
        <NuxtLink to="/catalog" class="text-blue-600 hover:underline">
          Continue Shopping
        </NuxtLink>
      </div>
      <div v-else>
        <template v-for="(item, index) in cartItems" :key="item._id || index">
          <CartProduct
            :product-id="getProductInfo(item).id"
            :title="getProductInfo(item).title"
            :image="getProductInfo(item).image"
            :sku="getProductInfo(item).sku"
            :quantity="getProductInfo(item).quantity"
            :price="getProductInfo(item).price"
            @remove="handleRemoveItem"
            @update="handleUpdateQuantity"
            @error="handleError"
          />
          <div 
            v-if="index !== cartItems.length - 1" 
            class="h-px bg-cart-border-separator" 
          />
        </template>
      </div>
    </div>

    <OrderSummary />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { Typography } from "~/shared/ui";
import CartProduct from "~/entities/cart/ui/cart-product.vue";
import OrderSummary from "~/widgets/order-summary/ui/order-summary.vue";
import { useCartStore } from "~/entities/cart/model/use-cart";

definePageMeta({
  middleware: ["auth"],
});

const cartStore = useCartStore();
const errorMessage = ref<string | null>(null);

const fetchCart = async () => {
  try {
    errorMessage.value = null;
    await cartStore.fetchCart();
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to load cart';
  }
};

const cartItems = computed(() => {
  return cartStore.cart?.items || [];
});

const isLoading = computed(() => cartStore.isLoading);
const handleRemoveItem = async (productId: string) => {
  try {
    errorMessage.value = null;
    await cartStore.removeFromCart(productId);
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to remove item';
  }
};

const handleUpdateQuantity = async (productId: string, quantity: number) => {
  try {
    errorMessage.value = null;
    await cartStore.updateQuantity(productId, quantity);
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to update quantity';
  }
};

const handleError = (message: string) => {
  errorMessage.value = message;
};

const getProductInfo = (item: any) => {
  const product = typeof item.productId === 'object' ? item.productId : null;
  
  return {
    id: item.productId._id || item.productId,
    title: product?.title || 'Product',
    image: product?.image || '',
    sku: product?.sku || item.productId._id?.slice(-8) || 'N/A',
    quantity: item.quantity,
    price: item.price,
  };
};

onMounted(() => {
  fetchCart();
});
</script>
