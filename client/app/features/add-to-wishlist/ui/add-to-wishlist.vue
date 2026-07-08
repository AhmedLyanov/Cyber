<script setup lang="ts">
import { computed } from "vue";

import { Icon } from "~/shared/ui";
import { useWishlist } from "~/entities/wishlist/model/use-wishlist";

const props = defineProps<{
  productId: string;
}>();

const {
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
  isAdding,
  isRemoving,
} = useWishlist();

const isFavourite = computed(() => {
  return isInWishlist(props.productId);
});

const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  event.stopPropagation();

  console.log("CLICK");

  if (isFavourite.value) {
    removeFromWishlist(props.productId);
  } else {
    addToWishlist({
      productId: props.productId,
    });
  }
};
</script>

<template>
  <button type="button" :disabled="isAdding || isRemoving" @click="handleClick">
    <Icon name="favourite" size="lg" :active="isFavourite" />
  </button>
</template>