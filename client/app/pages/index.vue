<template>
  <ProductBanner />
  <HeroBanner />
  <Category />
  <Products />
  <MostProducts /> 
  <DiscountProducts />
</template>

<script setup lang="ts">
import HeroBanner from '~/widgets/hero/hero-banner.vue'
import ProductBanner from '~/widgets/banner/product-banner.vue'
import Category from "~/widgets/category/category.vue";
import Products from "~/widgets/products/products.vue";
import MostProducts from "~/widgets/most-products/most-products.vue";
import DiscountProducts from "~/widgets/discount/discount.vue";
</script>