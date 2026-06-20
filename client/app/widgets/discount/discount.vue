<template>
    <div class="px-40 py-14 pb-14">
        <div class="flex gap-8 mb-8">
            <Typography variant="h3">
                Discounts up to -50%
            </Typography>
        </div>

        <div class="grid grid-cols-4 gap-4">
            <ProductCard
                v-for="product in discountProducts"
                :key="product._id"
                :product="product"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

import { Typography } from "~/shared/ui";
import ProductCard from "~/entities/product/ui/product-card.vue";

import { getProducts } from "~/entities/product/api/get-products";
import type { Product } from "~/entities/product/model/types";

const products = ref<Product[]>([]);

const discountProducts = computed(() => {
    return products.value.slice(0, 4);
});

onMounted(async () => {
    const response = await getProducts();

    products.value = response.products;
});
</script>