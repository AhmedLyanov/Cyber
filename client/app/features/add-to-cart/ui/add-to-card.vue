<script setup lang="ts">
import { useAddToCart } from "../model/use-add-to-cart";

const props = defineProps<{
  productId: string;
}>();

const { addToCart, isPending } = useAddToCart();

const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();

  addToCart({
    productId: props.productId,
    quantity: 1,
  });
};
</script>

<template>
  <button
    type="button"
    :disabled="isPending"
    @click="handleClick"
  >
    <slot />
  </button>
</template>