<template>
  <section class="px-40 py-20">
    <Typography variant="h3">Related Products</Typography>
    <div class="grid grid-cols-4 gap-4 mt-8">
      <ProductCard v-for="i in 4" :key="i" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Typography } from "~/shared/ui";
import ProductCard from "~/entities/product/ui/product-card.vue";
</script>