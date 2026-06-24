<template>
  <div class="w-full flex items-center justify-between py-10">
    <div class="flex flex-1 items-center gap-6">
      <img :src="productImage" :alt="title" class="h-22.5 w-22.5 object-contain" @error="handleImageError" />

      <div class="grid gap-2">
        <Typography variant="cartTitle">
          {{ title }}
        </Typography>

        <Typography variant="productSku">
          #{{ sku || productId.slice(-8) }}
        </Typography>
      </div>
    </div>

    <div class="flex items-center gap-8">
      <div class="flex items-center gap-6">
        <button class="text-4xl" @click="decreaseQuantity" :disabled="isLoading || quantity <= 1">
          <Icon name="noedit" size="md" />
        </button>

        <input :value="quantity" type="number" class="h-8 w-10 rounded-lg border text-center text-2xl"
          @change="handleQuantityChange" :disabled="isLoading" min="1" />

        <button class="text-4xl" @click="increaseQuantity" :disabled="isLoading">
          <Icon name="edit" size="md" />
        </button>
      </div>

      <div class="text-right text-4xl font-medium">
        <Typography variant="productPrice">
          {{ formattedPrice }}
        </Typography>
      </div>

      <button @click="handleRemove" :disabled="isLoading">
        <Icon name="delete_card" size="md" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Typography } from '~/shared/ui/';
import Icon from '~/shared/ui/icon/icon.vue';
import { useCartStore } from '../model/use-cart';

const props = defineProps<{
  productId: string;
  title: string;
  image?: string;
  sku?: string;
  quantity: number;
  price: number;
}>();

const emit = defineEmits<{
  (e: 'remove', productId: string): void;
  (e: 'update', productId: string, quantity: number): void;
  (e: 'error', message: string): void;
}>();

const cartStore = useCartStore();
const isLoading = ref(false);
const localQuantity = ref(props.quantity);

const formattedPrice = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(props.price);
});

const productImage = computed(() => {
  if (!props.image) return '/images/Image-not-found.png';
  if (props.image.startsWith('http')) return props.image;
  return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/uploads/products/${props.image}`;
});

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  img.src = '/images/Image-not-found.png';
};

const decreaseQuantity = async () => {
  if (localQuantity.value <= 1) return;
  const newQuantity = localQuantity.value - 1;
  await updateQuantity(newQuantity);
};

const increaseQuantity = async () => {
  const newQuantity = localQuantity.value + 1;
  await updateQuantity(newQuantity);
};

const handleQuantityChange = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  let newQuantity = parseInt(input.value);

  if (isNaN(newQuantity) || newQuantity < 1) {
    newQuantity = 1;
    input.value = '1';
  }

  await updateQuantity(newQuantity);
};

const updateQuantity = async (newQuantity: number) => {
  if (isLoading.value) return;
  if (newQuantity === props.quantity) return;

  try {
    isLoading.value = true;
    localQuantity.value = newQuantity;

    await cartStore.updateQuantity(props.productId, newQuantity);
    emit('update', props.productId, newQuantity);

  } catch (error: any) {
    localQuantity.value = props.quantity;
    emit('error', error.message || 'Failed to update quantity');
  } finally {
    isLoading.value = false;
  }
};

const handleRemove = async () => {
  if (isLoading.value) return;

  try {
    isLoading.value = true;
    await cartStore.removeFromCart(props.productId);
    emit('remove', props.productId);
  } catch (error: any) {
    emit('error', error.message || 'Failed to remove item');
  } finally {
    isLoading.value = false;
  }
};

watch(() => props.quantity, (newVal) => {
  localQuantity.value = newVal;
});
</script>

<style scoped>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>