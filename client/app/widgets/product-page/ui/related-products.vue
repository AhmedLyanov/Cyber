<template>
  <section class="px-40 py-20">
    <Typography variant="h3">
      Related Products
    </Typography>

    <div class="grid grid-cols-4 gap-4 mt-8">
      <ProductCard
        v-for="product in relatedProducts"
        :key="product._id"
        :product="product"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import { Typography } from "~/shared/ui";
import ProductCard from "~/entities/product/ui/product-card.vue";

import { getProducts } from "~/entities/product/api/get-products";
import type { Product } from "~/entities/product/model/types";

const products = ref<Product[]>([]);

const relatedProducts = computed(() => {
  return products.value.slice(0, 4);
});

onMounted(async () => {
  const response = await getProducts();

  products.value = response.products;
});
</script>