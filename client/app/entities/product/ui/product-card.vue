<template>
  <NuxtLink 
    :to="`/product/${props.product._id}`"
    class="w-67 bg-product-color rounded-lg p-5 flex flex-col items-center"
  >
    <AddToCartButton 
      class="w-full flex items-center justify-end mb-3" 
      :product-id="props.product._id"
    >
      <Icon name="favourite" size="lg" />
    </AddToCartButton>

    <div class="w-40 h-40 flex items-center justify-center mb-4">
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
      <Typography variant="body" class="text-center mb-2 min-h-14 line-clamp-2">
        {{ props.product.title }}
      </Typography>

      <Typography variant="h3" class="text-2xl font-bold text-center mb-6">
        ${{ props.product.price }}
      </Typography>

      <Button variant="primary" class="w-full">
        Buy Now
      </Button>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Typography, Button, Icon } from "~/shared/ui";
import type { Product } from "../model/types";
import AddToCartButton from "~/features/add-to-cart/ui/add-to-card.vue";

const props = defineProps<{
  product: Product;
}>();
</script>