<script setup lang="ts">
import { Typography, Input, Button } from "~/shared/ui";
</script>

<template>
    <div class="w-full rounded-[10px] border border-cart-order-border px-16 py-14">
        <Typography class="mb-10 font-bold" variant="h3">
            Order Summary
        </Typography>

        <div class="grid gap-6">
            <Input variant="cart" placeholder="Code" label="Discount code / Promo code" />

            <div class="relative">
                <Input variant="cart" placeholder="Enter Card Number" label="Your bonus card number" />

                <Button class="rounded-[6px] absolute right-4 bottom-4 min-w-[76px] h-8" variant="outline">
                    Apply
                </Button>
            </div>
            <div class="mt-2 grid gap-4">
                <div class="flex items-center justify-between">
                    <span class="font-medium text-base leading-6 tracking-[0.03em]">
                        Subtotal
                    </span>

                    <span class="font-medium text-base leading-8 tracking-[0.03em]">
                        $2347
                    </span>
                </div>

                <div class="flex items-center justify-between">
                    <span class="text-[16px] leading-8 tracking-[0.03em] text-gray">
                        Estimated Tax
                    </span>

                    <span class="font-medium text-base leading-8 tracking-[0.03em]">
                        $50
                    </span>
                </div>

                <div class="flex items-center justify-between">
                    <span class="text-[16px] leading-8 tracking-[0.03em] text-gray">
                        Estimated shipping & Handling
                    </span>

                    <span class="font-medium text-base leading-8 tracking-[0.03em]">
                        $29
                    </span>
                </div>

                <div class="mt-2 flex items-center justify-between">
                    <span class="font-medium text-base leading-6 tracking-[0.03em]">
                        Total
                    </span>

                    <span class="font-medium text-base leading-8 tracking-[0.03em]">
                        $2426
                    </span>
                </div>
            </div>
        </div>

        <Button class="mt-12 py-4 w-full" variant="primary">
            Checkout
        </Button>
    </div>
</template>