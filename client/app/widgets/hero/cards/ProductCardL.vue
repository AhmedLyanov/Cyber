<template>
  <div
    class="flex items-center justify-between bg-banner-background-gray min-h-150"
  >
    <div class="px-14">
      <ProductContent
        title="Macbook Air"
        description="The new 15-inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display."
        showButton
      />
    </div>

    <div class="w-100 h-125">
      <NuxtImg
        :src="MacBookAir"
        alt="Macbook Air"
        class="w-full h-full object-contain"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductContent from '~/entities/product/ui/ProductContent.vue'
import MacBookAir from '/images/MacBookAir.png'

</script>