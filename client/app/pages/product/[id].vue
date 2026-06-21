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

const breadcrumbItems = computed(() => [
  { label: "Home", to: "/" },
  { label: "Catalog", to: "/catalog" },
  { label: product.brand },
  { label: product.title },
]);
</script>

<template>
  <Breadcrumbs :items="breadcrumbItems" />

  <ProductHero :product="product" />

  <ProductDetails :product="product" />

  <ProductReviews />

  <RelatedProducts />
</template>