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

useSeoMeta({
  title: 'Cyber | Modern Electronics Store',
  description:
    'Discover smartphones, laptops, gaming accessories, headphones, and the latest technology products at Cyber.',

  ogTitle: 'Cyber | Modern Electronics Store',
  ogDescription:
    'Shop the latest electronics, gadgets, and accessories with great prices and exclusive deals at Cyber.',
  ogType: 'website',

  twitterTitle: 'Cyber | Modern Electronics Store',
  twitterDescription:
    'Explore the newest technology products and exclusive discounts at Cyber.',
  twitterCard: 'summary_large_image',

  keywords:
    'electronics store, smartphones, laptops, gaming, accessories, gadgets, cyber shop'
});

useHead({
  htmlAttrs: {
    lang: 'en'
  }
});
</script>