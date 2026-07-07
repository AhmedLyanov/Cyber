<template>
  <section class="px-40 py-20">

    <Typography 
      variant="titleLg"
      class="mb-10"
    >
      Favourites
    </Typography>


    <div
      v-if="isLoading"
      class="text-center"
    >
      Loading...
    </div>


    <div
      v-else-if="!products.length"
      class="text-center"
    >
      Your wishlist is empty
    </div>


    <div
      v-else
      class="grid grid-cols-4 gap-6"
    >

      <ProductCard
        v-for="product in products"
        :key="product._id"
        :product="product"
      />

    </div>

  </section>
</template>


<script setup lang="ts">

import { computed } from "vue";

import { Typography } from "~/shared/ui";

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