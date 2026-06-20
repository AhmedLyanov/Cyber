<template>
  <div class="catalog-page">
    <Breadcrumbs :items="breadcrumbItems" />

    <div class="flex gap-8 px-40 pt-6 pb-14">
      <aside class="w-[256px] flex-shrink-0">
        <FilterAccordion title="Brand" :items="brands" searchable />

        <FilterAccordion title="Battery capacity" :items="batteryCapacity" />

        <FilterAccordion title="Screen type" :items="screenTypes" />

        <FilterAccordion title="Screen diagonal" :items="screenDiagonals" />

        <FilterAccordion title="Protection class" :items="protectionClasses" />

        <FilterAccordion title="Built-in memory" :items="memoryOptions" />
      </aside>

      <main class="flex-1">
        <div class="flex items-center justify-between mb-4">
          <div>
            <span class="text-[16px] leading-4 text-catalog-length font-regular">
              Selected Products:
            </span>

            <span class="font-medium leading-4 text-[20px] text-primary">
              {{ products.length }}
            </span>
          </div>

          <Dropdown class="w-[256px]" v-model="selectedSort" variant="bordered" :items="sortOptions"
            default-label="By rating" />
        </div>

        <div class="flex flex-wrap gap-4">
          <ProductCard v-for="product in products" :key="product._id" :product="product" />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import ProductCard from '~/entities/product/ui/product-card.vue'


import {
  Breadcrumbs,
  Dropdown,
  FilterAccordion
} from '~/shared/ui'

import { getProducts } from '~/entities/product/api/get-products'
import type { Product } from '~/entities/product/model/types'

const products = ref<Product[]>([])

const selectedSort = ref(null)

onMounted(async () => {
  const response = await getProducts()

  products.value = response.products
})

const breadcrumbItems = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Catalog'
  }
]</script>