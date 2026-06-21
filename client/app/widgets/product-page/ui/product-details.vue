<template>
  <section id="product-details" class="bg-product-details-bg px-40 py-20 scroll-mt-20">
    <div class="bg-product-details-window-bg py-12 px-10 rounded-xl">
      <Typography variant="h3">Details</Typography>

      <Typography class="mt-8" variant="description">
        {{ product.description }}
      </Typography>

      <div v-for="section in visibleSections" :key="section.title" class="mt-8">
        <Typography class="pb-4" variant="h3">
          {{ section.title }}
        </Typography>

        <div class="grid gap-6">
          <div v-for="item in section.items" :key="item.label"
            class="w-full flex pb-2 justify-between border-b border-product-details-border">
            <Typography class="text-[16px] leading-6" variant="body">
              {{ item.label }}
            </Typography>

            <Typography variant="body">
              {{ item.value }}
            </Typography>
          </div>
        </div>
      </div>

      <div class="flex justify-center mt-8">
        <Button variant="outline" class="min-w-[180px]" @click="showAllDetails = !showAllDetails">
          {{ showAllDetails ? "Show Less" : "View More" }}

          <Icon name="expand-arrow-down" size="md" class="transition-transform duration-300 ml-2"
            :class="{ 'rotate-180': showAllDetails }" />
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { Typography, Button, Icon } from "~/shared/ui";
import type { Product } from "~/entities/product/model/types";

const props = defineProps<{
  product: Product;
}>();

const showAllDetails = ref(false);

const allDetailSections = computed(() => [
  {
    title: "Screen",
    items: [
      {
        label: "Screen Type",
        value: props.product.specs?.screenType || "-"
      },
      {
        label: "Screen Diagonal",
        value: props.product.specs?.screenDiagonal || "-"
      }
    ]
  },

  {
    title: "CPU",
    items: [
      {
        label: "Processor",
        value: props.product.specs?.cpu || "-"
      }
    ]
  },

  {
    title: "Battery",
    items: [
      {
        label: "Battery Capacity",
        value: props.product.specs?.batteryCapacity || "-"
      }
    ]
  },

  {
    title: "Memory",
    items: [
      {
        label: "Built-in Memory",
        value: props.product.specs?.builtInMemory || "-"
      }
    ]
  },

  {
    title: "Protection",
    items: [
      {
        label: "Protection Class",
        value: props.product.specs?.protectionClass || "-"
      }
    ]
  },

  {
    title: "Product",
    items: [
      {
        label: "Brand",
        value: props.product.brand
      },
      {
        label: "Category",
        value: props.product.type
      },
      {
        label: "Price",
        value: `$${props.product.price}`
      }
    ]
  }
]);

const visibleSections = computed(() =>
  showAllDetails.value
    ? allDetailSections.value
    : allDetailSections.value.slice(0, 2)
);
</script>