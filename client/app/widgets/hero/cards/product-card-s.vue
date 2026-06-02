<script setup lang="ts">
import ProductContent from '~/entities/product/ui/product-content.vue'

interface Props {
  title: string
  description: string
  image: string
  dark?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="[
      'flex items-center overflow-hidden',
      dark
        ? 'bg-banner-background-dark text-banner-text'
        : 'bg-banner-background-gray text-primary'
    ]"
  >
    <div class="shrink-0">
      <img
        :src="props.image"
        :alt="props.title"
      />
    </div>

    <div class="px-6">
      <ProductContent
        :title="props.title"
        :description="props.description"
        :dark="props.dark"
      />
    </div>
  </div>
</template>