<script setup lang="ts">
import { Typography } from "~/shared/ui";
import CartProduct from "~/entities/cart/ui/cart-product.vue";
import OrderSummary from "~/widgets/order-summary/ui/order-summary.vue";

const products = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
];
</script>

<template>
    <div class="flex justify-center gap-12 px-40 py-28">
        <div class="w-full">
            <Typography class="mb-10" variant="h3">
                Shopping Cart
            </Typography>

            <div class="">
                <template v-for="(product, index) in products" :key="product.id">
                    <CartProduct />
                    <div v-if="index !== products.length - 1" class="h-px  bg-cart-border-separator" />
                </template>
            </div>
        </div>

        <OrderSummary />
    </div>
</template>