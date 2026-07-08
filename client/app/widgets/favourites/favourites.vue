<template>
  <section class="min-h-[70vh] py-28 px-40">
    <Typography class="mb-10" variant="h3">
      Wishlist
    </Typography>

    <div v-if="isLoading" class="flex items-center justify-center">
      <Spinner />
    </div>

    <div v-else-if="!products.length" class="text-center">
      Your wishlist is empty
    </div>

    <div v-else class="flex flex-col gap-4 max-w-7xl mx-auto">
      <WishlistCard 
        v-for="product in products" 
        :key="product._id" 
        :product="product" 
        @remove="handleRemove"
        @addToCart="handleAddToCart"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Typography, Spinner } from "~/shared/ui";
import WishlistCard from "~/entities/wishlist/ui/wishlist-card.vue";
import { useWishlist } from "~/entities/wishlist/model/use-wishlist";

const {
  wishlist,
  isLoading,
  removeFromWishlist,
  addToCart,
} = useWishlist();

const products = computed(() => {
  return wishlist.value?.wishlist.products ?? [];
});

const handleRemove = async (productId: string) => {
  await removeFromWishlist(productId);
};

const handleAddToCart = (product: Product) => {
  addToCart(product);
};
</script>