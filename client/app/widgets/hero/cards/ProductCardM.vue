<template>
  <div class="flex items-center bg-banner-background-light overflow-hidden">
    <div class="shrink-0 h-full" >
      <NuxtImg
        :src="PlayStation"
        alt="Playstation 5"
        class="object-cover h-full"
      />
    </div>

    <div class="px-8">
      <ProductContent
        title="Playstation 5"
        description="Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductContent from '~/entities/product/ui/ProductContent.vue'
import PlayStation from '/images/PlayStation.png'
</script>