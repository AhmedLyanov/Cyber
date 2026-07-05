<template>
    <div class="px-40 py-14 pb-14">
        <div class="flex gap-8 mb-8">
            <Typography variant="h4">New Arrival</Typography>
            <Typography variant="h4">Bestseller</Typography>
            <Typography variant="h4">Featured Products</Typography>
        </div>

        <div class="grid grid-cols-4 gap-4">
            <ProductCard v-for="product in displayedProducts" :key="product._id" :product="product" />

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import { Typography } from "~/shared/ui";
import ProductCard from "~/entities/product/ui/product-card.vue";

import { getProducts } from "~/entities/product/api/get-products";
import type { Product } from "~/entities/product/model/types";

const products = ref<Product[]>([]);

const displayedProducts = computed(() => {
    return products.value.slice(0, 8);
});

onMounted(async () => {
    const response = await getProducts();

    products.value = response.products;
});
</script>