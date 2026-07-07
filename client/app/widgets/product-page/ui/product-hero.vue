<template>
  <section class="flex items-center gap-12 px-40 py-28">
    <div class="flex items-center gap-12">
      <div class="flex flex-col gap-4">
        <button v-for="image in productImages" :key="image" @click="selectedImage = image"
          class="w-20 h-20 rounded-xl overflow-hidden transition-all">
          <img :src="image" :alt="props.product.title" class="w-full h-full object-contain" />
        </button>
      </div>

      <div class="w-132.5 h-125 flex items-center justify-center">
        <img :src="selectedImage" :alt="props.product.title" class="w-full h-full object-contain" />
      </div>
    </div>

    <div>
      <div class="grid gap-8">
        <div>
          <Typography as="h1" variant="titleLg" class="mb-6">
            {{ props.product.title }}
          </Typography>

          <Typography variant="priceLg">
            ${{ props.product.price }}
          </Typography>
        </div>

        <ColorPicker v-model="selectedColor" :colors="colors" label="Select color:" size="md" />

        <div class="flex flex-wrap gap-4">
          <div v-for="specification in specifications" :key="specification.title"
            class="min-w-42 flex-1 flex items-center gap-2 bg-product-attributes rounded-[7px] p-4">
            <Icon :name="specification.icon" size="lg" class="text-product-attributes-icon" />

            <div>
              <Typography variant="description">
                {{ specification.title }}
              </Typography>

              <Typography variant="description">
                {{ specification.value }}
              </Typography>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <Typography variant="description" class="max-w-xl line-clamp-3">
            {{ props.product.description }}
          </Typography>

          <button @click="scrollToDetails"
            class="text-primary hover:text-primary-hover transition-colors duration-200 text-sm font-medium flex items-center gap-1 w-fit group">
            more
            <Icon name="expand-arrow-down" size="sm"
              class="transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>

      <div class="flex gap-4 mt-8">
        <Button class="w-65" variant="outline">
          Add to Wishlist
        </Button>

        <Button class="w-65" :disabled="isPending" @click="handleAddToCart">
          Add to Cart
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { Typography, Icon, Button, ColorPicker } from "~/shared/ui";
import type { Product } from "~/entities/product/model/types";
import { useAddToCart } from "~/features/add-to-cart/model/use-add-to-cart";

const props = defineProps<{
  product: Product;
}>();
const { addToCart, isPending } = useAddToCart();
const selectedColor = ref('#000000');
const selectedImage = ref("");

const colors = [
  {
    value: 'var(--color-product-black)',
    name: 'Black',
    label: 'Black',
    class: 'border-gray-300'
  },
  {
    value: 'var(--color-product-purple)',
    name: 'Purple',
    label: 'Purple',
    class: 'border-gray-300'
  },
  {
    value: 'var(--color-product-red)',
    name: 'Red',
    label: 'Red',
    class: 'border-gray-300'
  },
  {
    value: 'var(--color-product-gold)',
    name: 'Gold',
    label: 'Gold',
    class: 'border-gray-300'
  },
  {
    value: 'var(--color-product-silver)',
    name: 'Silver',
    label: 'Silver',
    class: 'border-gray-400'
  },
];

const productImages = computed(() => [
  `http://localhost:5001/uploads/products/${props.product.image}`,
]);

watch(
  productImages,
  (images) => {
    selectedImage.value = images[0];
  },
  { immediate: true }
);

const specifications = computed(() => [
  {
    icon: "screen-size-logo",
    title: "Screen",
    value: props.product.specs?.screenDiagonal || "-",
  },
  {
    icon: "logo-cpu",
    title: "CPU",
    value: props.product.specs?.cpu || "-",
  },
  {
    icon: "battery-logo",
    title: "Battery",
    value: props.product.specs?.batteryCapacity || "-",
  },
  {
    icon: "core-logo",
    title: "Memory",
    value: props.product.specs?.builtInMemory || "-",
  },
  {
    icon: "product-camera-logo",
    title: "Protection",
    value: props.product.specs?.protectionClass || "-",
  },
  {
    icon: "product-camera-rotate",
    title: "Display",
    value: props.product.specs?.screenType || "-",
  },
]);

const scrollToDetails = () => {
  const detailsSection = document.getElementById('product-details');
  if (detailsSection) {
    detailsSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const handleAddToCart = () => {
  addToCart({
    productId: props.product._id,
    quantity: 1,
  });
};
</script>

<style scoped>
.bg-product-attributes {
  background-color: var(--color-product-attributes);
}

.text-product-attributes-icon {
  color: var(--color-product-attributes-icon);
}
</style>