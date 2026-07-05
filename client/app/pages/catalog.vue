<template>
  <div class="catalog-page">
    <Breadcrumbs :items="breadcrumbItems" />

    <div class="flex gap-8 px-40 pt-6 pb-14">
      <aside class="w-[256px] flex-shrink-0">
        <FilterAccordion title="Brand" :items="brands" @change="handleBrandFilter" />

        <FilterAccordion title="Battery capacity" :items="batteryCapacity" @change="handleBatteryFilter" />

        <FilterAccordion title="Screen type" :items="screenTypes" @change="handleScreenTypeFilter" />

        <FilterAccordion title="Screen diagonal" :items="screenDiagonals" @change="handleScreenDiagonalFilter" />

        <FilterAccordion title="Protection class" :items="protectionClasses" @change="handleProtectionFilter" />

        <FilterAccordion title="Built-in memory" :items="memoryOptions" @change="handleMemoryFilter" />
      </aside>

      <main class="flex-1">
        <div class="flex items-center justify-between mb-4">
          <div>
            <span class="text-[16px] leading-4 text-catalog-length font-regular">
              Selected Products:
            </span>

            <span class="font-medium leading-4 text-[20px] text-primary">
              {{ totalProducts }}
            </span>
          </div>

          <Dropdown class="w-[256px]" v-model="selectedSort" variant="bordered" :items="sortOptions"
            default-label="By rating" />
        </div>

        <div class="flex flex-wrap gap-4">
          <ProductCard v-for="product in products" :key="product._id" :product="product" />
        </div>
        <div class="flex justify-center mt-10">
          <Pagination :current-page="currentPage" :pages="totalPages" @change="changePage" />
        </div>
      </main>

    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import ProductCard from "~/entities/product/ui/product-card.vue";

import {
  Breadcrumbs,
  Dropdown,
  Pagination,
  FilterAccordion,
} from "~/shared/ui";

import {
  BATTERY_CAPACITIES,
  SCREEN_TYPES,
  SCREEN_DIAGONALS,
  PROTECTION_CLASSES,
  BUILT_IN_MEMORY,
  PRODUCT_BRANDS
} from "~/shared/constants/product-filters";

import { getProducts } from "~/entities/product/api/get-products";

import type {
  Product,
  ProductBrand,
} from "~/entities/product/model/types";

const products = ref<Product[]>([]);

const selectedSort = ref("");

const currentPage = ref(1);
const totalPages = ref(1);
const totalProducts = ref(0);

const selectedBrands = ref<string[]>([]);
const selectedBatteryCapacity = ref<string[]>([]);
const selectedScreenTypes = ref<string[]>([]);
const selectedScreenDiagonals = ref<string[]>([]);
const selectedProtectionClasses = ref<string[]>([]);
const selectedMemoryOptions = ref<string[]>([]);

const batteryCapacity = BATTERY_CAPACITIES.map((item) => ({
  label: item,
  count: 0,
}));

const brands = PRODUCT_BRANDS.map((item) => ({
  label: item,
  count: 0,
}));

const screenTypes = SCREEN_TYPES.map((item) => ({
  label: item,
  count: 0,
}));

const screenDiagonals = SCREEN_DIAGONALS.map((item) => ({
  label: item,
  count: 0,
}));

const protectionClasses = PROTECTION_CLASSES.map((item) => ({
  label: item,
  count: 0,
}));

const memoryOptions = BUILT_IN_MEMORY.map((item) => ({
  label: item,
  count: 0,
}));

const seoTitle = computed(() => {
  const filters: string[] = [];

  if (selectedBrands.value.length) {
    filters.push(selectedBrands.value.join(", "));
  }

  if (selectedScreenTypes.value.length) {
    filters.push(selectedScreenTypes.value.join(", "));
  }

  if (selectedMemoryOptions.value.length) {
    filters.push(selectedMemoryOptions.value.join(", "));
  }

  if (selectedProtectionClasses.value.length) {
    filters.push(selectedProtectionClasses.value.join(", "));
  }

  if (selectedBatteryCapacity.value.length) {
    filters.push(selectedBatteryCapacity.value.join(", "));
  }

  if (selectedScreenDiagonals.value.length) {
    filters.push(selectedScreenDiagonals.value.join(", "));
  }

  if (filters.length > 0) {
    return `${filters.join(" • ")} (${totalProducts.value}) | Cyber`;
  }

  return `Catalog (${totalProducts.value}) | Cyber`;
});

const seoDescription = computed(() => {
  const filters: string[] = [];

  if (selectedBrands.value.length) {
    filters.push(`brands ${selectedBrands.value.join(", ")}`);
  }

  if (selectedScreenTypes.value.length) {
    filters.push(`screen types ${selectedScreenTypes.value.join(", ")}`);
  }

  if (selectedMemoryOptions.value.length) {
    filters.push(`storage ${selectedMemoryOptions.value.join(", ")}`);
  }

  if (selectedProtectionClasses.value.length) {
    filters.push(
      `protection ${selectedProtectionClasses.value.join(", ")}`
    );
  }

  if (selectedBatteryCapacity.value.length) {
    filters.push(
      `battery capacity ${selectedBatteryCapacity.value.join(", ")}`
    );
  }

  if (selectedScreenDiagonals.value.length) {
    filters.push(
      `screen size ${selectedScreenDiagonals.value.join(", ")}`
    );
  }

  if (filters.length > 0) {
    return `Browse products with ${filters.join(
      ", "
    )} in the Cyber electronics catalog. Found ${totalProducts.value
      } matching products.`;
  }

  return "Browse smartphones, laptops, gaming devices and accessories in the Cyber electronics catalog.";
});

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDescription.value,

  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDescription.value,

  twitterTitle: () => seoTitle.value,
  twitterDescription: () => seoDescription.value,

  twitterCard: "summary_large_image",

  robots: "index, follow",
});

useHead({
  link: [
    {
      rel: "canonical",
      href: "https://cyber.com/catalog",
    },
  ],
});

const loadProducts = async () => {
  const response = await getProducts({
    page: currentPage.value,
    limit: 9,

    brand:
      selectedBrands.value.length > 0
        ? (selectedBrands.value[0] as ProductBrand)
        : undefined,

    batteryCapacity:
      selectedBatteryCapacity.value.length > 0
        ? selectedBatteryCapacity.value[0]
        : undefined,

    screenType:
      selectedScreenTypes.value.length > 0
        ? selectedScreenTypes.value[0]
        : undefined,

    screenDiagonal:
      selectedScreenDiagonals.value.length > 0
        ? selectedScreenDiagonals.value[0]
        : undefined,

    protectionClass:
      selectedProtectionClasses.value.length > 0
        ? selectedProtectionClasses.value[0]
        : undefined,

    builtInMemory:
      selectedMemoryOptions.value.length > 0
        ? selectedMemoryOptions.value[0]
        : undefined,
  });

  products.value = response.products;

  totalPages.value = response.pagination.pages;
  totalProducts.value = response.pagination.total;
};

const changePage = async (page: number) => {
  currentPage.value = page;
  await loadProducts();
};

const handleBrandFilter = async (values: string[]) => {
  selectedBrands.value = values;
  currentPage.value = 1;
  await loadProducts();
};

const handleBatteryFilter = async (values: string[]) => {
  selectedBatteryCapacity.value = values;
  currentPage.value = 1;
  await loadProducts();
};

const handleScreenTypeFilter = async (values: string[]) => {
  selectedScreenTypes.value = values;
  currentPage.value = 1;
  await loadProducts();
};

const handleScreenDiagonalFilter = async (values: string[]) => {
  selectedScreenDiagonals.value = values;
  currentPage.value = 1;
  await loadProducts();
};

const handleProtectionFilter = async (values: string[]) => {
  selectedProtectionClasses.value = values;
  currentPage.value = 1;
  await loadProducts();
};

const handleMemoryFilter = async (values: string[]) => {
  selectedMemoryOptions.value = values;
  currentPage.value = 1;
  await loadProducts();
};

onMounted(loadProducts);

const breadcrumbItems = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Catalog",
  },
];
</script>