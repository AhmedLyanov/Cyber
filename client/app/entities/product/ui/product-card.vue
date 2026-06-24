<template>
  <NuxtLink
    :to="`/product/${props.product._id}`"
    class="w-67 bg-product-color rounded-lg p-5 flex flex-col items-center"
  >
    <div class="w-full flex items-center justify-end">
      <Icon name="favourite" size="lg" />
    </div>

    <div class="w-40 h-40 flex items-center justify-center mb-3">
      <NuxtImg
        v-if="props.product.image"
        :src="`http://localhost:5001/uploads/products/${props.product.image}`"
        :alt="props.product.title"
        class="w-full h-full object-contain"
      />

      <NuxtImg
        v-else
        src="/images/image-not-found.png"
        :alt="props.product.title"
        class="max-w-full max-h-full object-contain"
      />
    </div>

    <div class="flex flex-col flex-1 w-full">
      <div class="text-center">
        <Typography variant="body" class="text-center mt-2 min-h-14">
          {{ props.product.title }}
        </Typography>

        <Typography variant="h3" class="text-2xl font-bold">
          ${{ props.product.price }}
        </Typography>
      </div>

      <Button variant="primary" class="w-full mt-6">
        Buy Now
      </Button>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Typography, Button, Icon } from "~/shared/ui";
import type { Product } from "../model/types";

const props = defineProps<{
  product: Product;
}>();
</script>