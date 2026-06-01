<template>
  <div class="flex items-center w-full h-157.5 bg-product-banner px-40">
    <div class="flex items-center flex-1">
      <ProductContent
        title="IPhone 14"
        subtitle="Pro"
        description="Created to change everything for the better. For everyone"
        title-variant="h2Hero"
        description-variant="bodyLg"
        dark
        showButton
      />
    </div>

    <div class="w-1/3 max-w-100 self-end">
      <NuxtImg
        class="w-full h-full"
        src="/images/IPhone.png"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProductContent from "~/entities/product/ui/ProductContent.vue";
</script>