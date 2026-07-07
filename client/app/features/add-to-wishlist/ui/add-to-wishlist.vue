<script setup lang="ts">
import { useAddToWishlist } from "../model/use-add-to-wishlist";

import { Icon } from "~/shared/ui";


const props = defineProps<{
  productId: string;
}>();


const { 
  addToWishlist,
  isPending
} = useAddToWishlist();



const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();


  addToWishlist({
    productId: props.productId,
  });
};
</script>


<template>
  <button
    type="button"
    :disabled="isPending"
    @click="handleClick"
  >
    <Icon 
      name="favourite" 
      size="lg"
    />
  </button>
</template>