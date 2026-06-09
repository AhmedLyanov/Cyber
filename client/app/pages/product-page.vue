<template>
  <Breadcrumbs :items="breadcrumbItems" />
  <ProductHero />
  <ProductDetails />
  <ProductReviews />
  <RelatedProducts />
</template>

<script setup lang="ts">
import { Breadcrumbs } from "../shared/ui";
import ProductHero from "~/widgets/product-page/ui/product-hero.vue";
import ProductDetails from "~/widgets/product-page/ui/product-details.vue";
import ProductReviews from "~/widgets/product-page/ui/product-reviews.vue";
import RelatedProducts from "~/widgets/product-page/ui/related-products.vue";

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Catalog", to: "/" },
  { label: "Smartphones", to: "/" },
  { label: "Apple", to: "/" },
  { label: "Apple iPhone 14 Pro Max", to: "/" },
];
</script>