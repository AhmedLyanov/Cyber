<template>
  <div class="catalog-page">
    <Breadcrumbs :items="breadcrumbItems" />
    <div class="flex gap-8 px-40 pt-6 pb-14">
      <div class="w-[256px] flex-shrink-0">
        <Dropdown 
          v-model="selectedOption"
          :items="['По умолчанию', 'Сначала дешевые', 'Сначала дорогие', 'По популярности', 'По новизне']" 
          default-label="Brand"
          @select="handleSelect"
        />
        
        <Dropdown 
          v-model="selectedOption2"
          :items="['3000mAh', '4000mAh', '5000mAh', '6000mAh']" 
          default-label="Battery capacity"
          @select="handleSelect"
        />
        
        <Dropdown 
          v-model="selectedOption3"
          :items="['AMOLED', 'IPS', 'OLED', 'LCD']" 
          default-label="Screen type"
          @select="handleSelect"
        />
        
        <Dropdown 
          v-model="selectedOption4"
          :items="['6.1', '6.7', '6.9']" 
          default-label="Screen diagonal"
          @select="handleSelect"
        />
        
        <Dropdown 
          v-model="selectedOption5"
          :items="['IP67', 'IP68', 'IP69']" 
          default-label="Protection class"
          @select="handleSelect"
        />
        
        <Dropdown 
          v-model="selectedOption6"
          :items="['64GB', '128GB', '256GB', '512GB']" 
          default-label="Built-in memory"
          @select="handleSelect"
        />
      </div>
      <div class="flex-1">
        <div class="flex items-center gap-1.5 mb-4">
          <span class="text-[16px] leading-4 text-catalog-length font-medium">Selected Products:</span>
          <span class="font-medium leading-4 text-[20px] text-primary">84</span>
        </div>
        
        <div class="flex flex-wrap gap-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Breadcrumbs, Dropdown } from '~/shared/ui'
import ProductCard from '~/entities/product/ui/product-card.vue'
import { ref } from 'vue'

const selectedOption = ref(null)
const selectedOption2 = ref(null)
const selectedOption3 = ref(null)
const selectedOption4 = ref(null)
const selectedOption5 = ref(null)
const selectedOption6 = ref(null)

const handleSelect = (item) => {
  console.log('Selected:', item)
}

const breadcrumbItems = [
  { label: 'Home', to: '/' },
  { label: 'Catalog' }
]
</script>