<template>
    <div class="px-40 py-14 pb-14">
        <div class="flex gap-8 mb-8">
            <Typography variant="h3">Discounts up to -50%</Typography>
        </div>
        <div class="grid grid-cols-4 gap-4">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    </div>
</template>

<script setup lang="ts">
import {Typography} from "~/shared/ui"
import ProductCard from "~/entities/product/ui/product-card.vue"
</script>