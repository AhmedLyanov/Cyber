<template>
  <div
    class="group flex flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-300 "
  >
    <div class="flex items-start gap-6">
      <NuxtLink
        :to="`/product/${product._id}`"
        class="flex-shrink-0"
      >
        <NuxtImg
          :src="imageUrl"
          :alt="product.title"
          class="h-32 w-32 object-contain transition duration-300"
        />
      </NuxtLink>

      <div class="flex flex-1 items-center gap-6">
        <div class="flex flex-1 flex-col">
          <NuxtLink
            :to="`/product/${product._id}`"
            class="line-clamp-2 text-lg font-medium text-primary hover:underline"
          >
            {{ product.title }}
          </NuxtLink>

          <p class="mt-1 text-sm text-secondary">
            In stock
          </p>

          <p class="mt-2 text-2xl font-bold">
            ${{ product.price }}
          </p>
        </div>

        <div class="flex items-center gap-3">
          <Button
            class="whitespace-nowrap"
            @click="emit('addToCart', product)"
          >
            Add to cart
          </Button>

          <Button
            variant="ghost"
            size="icon"
            @click="emit('remove', product._id)"
          >
            <Icon
              name="mdi:heart-remove"
              class="size-5 text-red-500"
            />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import type { Product } from "~/entities/product/model/types";

import {
  Button,
  Icon,
} from "~/shared/ui";

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  remove: [id: string];
  addToCart: [product: Product];
}>();

const config = useRuntimeConfig();

const imageUrl = computed(() => {
  return `${config.public.apiBase}/uploads/products/${props.product.image}`;
});
</script>