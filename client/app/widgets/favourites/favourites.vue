<template>
  <section class="min-h-[70vh]  px-40 py-28">

    <Typography class="mb-10" variant="h3">
      Wishlist
    </Typography>


    <div v-if="isLoading" class="flex items-center justify-center">
      <Spinner />
    </div>


    <div v-else-if="!products.length" class="text-center">
      Your wishlist is empty
    </div>


    <div v-else class="grid grid-cols-4 gap-6">

      <ProductCard v-for="product in products" :key="product._id" :product="product" />

    </div>

  </section>
</template>


<script setup lang="ts">

import { computed } from "vue";

import { Typography, Spinner } from "~/shared/ui";

import ProductCard from "~/entities/product/ui/product-card.vue";

import { useWishlist } from "~/entities/wishlist/model/use-wishlist";


const {
  wishlist,
  isLoading,
} = useWishlist();



const products = computed(() => {
  return wishlist.value?.wishlist.products ?? [];
});


</script>