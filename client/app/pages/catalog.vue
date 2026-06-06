<template>
  <div class="catalog-page">
    <Breadcrumbs :items="breadcrumbItems" />

    <div class="flex gap-8 px-40 pt-6 pb-14">
      <aside class="w-[256px] flex-shrink-0">
        <FilterAccordion
          title="Brand"
          :items="brands"
          searchable
        />

        <FilterAccordion
          title="Battery capacity"
          :items="batteryCapacity"
        />

        <FilterAccordion
          title="Screen type"
          :items="screenTypes"
        />

        <FilterAccordion
          title="Screen diagonal"
          :items="screenDiagonals"
        />

        <FilterAccordion
          title="Protection class"
          :items="protectionClasses"
        />

        <FilterAccordion
          title="Built-in memory"
          :items="memoryOptions"
        />
      </aside>

      <main class="flex-1">
        <div class="flex items-center justify-between mb-4">
          <div>
            <span
              class="text-[16px] leading-4 text-catalog-length font-regular"
            >
              Selected Products:
            </span>

            <span
              class="font-medium leading-4 text-[20px] text-primary"
            >
              84
            </span>
          </div>

          <Dropdown
            class="w-[256px]"
            v-model="selectedSort"
            variant="bordered"
            :items="sortOptions"
            default-label="By rating"
          />
        </div>

        <div class="flex flex-wrap gap-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import ProductCard from '~/entities/product/ui/product-card.vue'

import {
  Breadcrumbs,
  Dropdown,
  FilterAccordion
} from '~/shared/ui'

const selectedSort = ref(null)

const sortOptions = [
  'By rating',
  'Price: Low to High',
  'Price: High to Low',
  'Newest',
  'Popular'
]

const brands = [
  { label: 'Apple', count: 110 },
  { label: 'Samsung', count: 125 },
  { label: 'Xiaomi', count: 68 },
  { label: 'Poco', count: 44 },
  { label: 'OPPO', count: 36 },
  { label: 'Honor', count: 10 },
  { label: 'Motorola', count: 34 },
  { label: 'Nokia', count: 22 },
  { label: 'Realme', count: 35 }
]

const batteryCapacity = [
  { label: '3000mAh', count: 18 },
  { label: '4000mAh', count: 42 },
  { label: '5000mAh', count: 51 },
  { label: '6000mAh', count: 14 }
]

const screenTypes = [
  { label: 'AMOLED', count: 64 },
  { label: 'OLED', count: 48 },
  { label: 'IPS', count: 23 },
  { label: 'LCD', count: 17 }
]

const screenDiagonals = [
  { label: '6.1"', count: 12 },
  { label: '6.5"', count: 28 },
  { label: '6.7"', count: 42 },
  { label: '6.9"', count: 8 }
]

const protectionClasses = [
  { label: 'IP67', count: 23 },
  { label: 'IP68', count: 48 },
  { label: 'IP69', count: 7 }
]

const memoryOptions = [
  { label: '64GB', count: 11 },
  { label: '128GB', count: 37 },
  { label: '256GB', count: 52 },
  { label: '512GB', count: 18 }
]

const breadcrumbItems = [
  {
    label: 'Home',
    to: '/'
  },
  {
    label: 'Catalog'
  }
]
</script>