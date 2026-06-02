<template>
    <div class="px-40 py-14 pb-14">
        <div class="flex gap-8 mb-8">
            <Typography variant="h4">New Arrival</Typography>
            <Typography variant="h4">Bestseller</Typography>
            <Typography variant="h4">Featured Products</Typography>
        </div>
        <div class="grid grid-cols-4 gap-4">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    </div>
</template>

<script lang="ts">
import {Typography} from "~/shared/ui"
import ProductCard from "~/entities/product/ui/product-card.vue"

export default {
    components: {
        ProductCard
    }
}
</script>