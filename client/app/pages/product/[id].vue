<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import ProductHero from "~/widgets/product-page/ui/product-hero.vue";
import ProductDetails from "~/widgets/product-page/ui/product-details.vue";
import ProductReviews from "~/widgets/product-page/ui/product-reviews.vue";
import RelatedProducts from "~/widgets/product-page/ui/related-products.vue";

import { Breadcrumbs } from "~/shared/ui";

import { getProduct } from "~/entities/product/api/get-product";

const route = useRoute();

const { product } = await getProduct(route.params.id as string);

useSeoMeta({
  title: `${product.title} | Cyber`,

  description:
    `${product.title} by ${product.brand}. ` +
    `Buy now for $${product.price} with fast delivery and secure checkout on Cyber.`,

  ogTitle: `${product.title} | Cyber`,

  ogDescription:
    `${product.title} by ${product.brand}. Available now on Cyber.`,

  ogImage: product.image,

  ogType: "product",

  twitterTitle: `${product.title} | Cyber`,

  twitterDescription:
    `${product.title} by ${product.brand}. Available now on Cyber.`,

  twitterImage: product.image,

  twitterCard: "summary_large_image",

  robots: "index, follow",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: `https://cyber.com/product/${product._id}`,
    },
  ],
});

const breadcrumbItems = computed(() => [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Catalog",
    to: "/catalog",
  },
  {
    label: product.brand,
  },
  {
    label: product.title,
  },
]);
</script>

<template>
  <Breadcrumbs :items="breadcrumbItems" />

  <ProductHero :product="product" />

  <ProductDetails :product="product" />

  <ProductReviews />

  <RelatedProducts />
</template>