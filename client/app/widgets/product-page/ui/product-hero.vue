<template>
  <section class="flex items-center gap-12 px-40 py-28">
    <div class="flex items-center gap-12">
      <div class="flex flex-col gap-4">
        <button
          v-for="image in productImages"
          :key="image"
          @click="selectedImage = image"
          class="w-20 h-20 rounded-xl overflow-hidden transition-all"
        >
          <img :src="image" alt="" class="w-full h-full object-contain" />
        </button>
      </div>

      <div class="w-132.5 h-125 flex items-center justify-center">
        <img :src="selectedImage" :alt="product.title" class="w-full h-full object-contain" />
      </div>
    </div>

    <div class="">
      <div class="grid gap-8">
        <div>
          <Typography as="h1" variant="titleLg" class="mb-6">
            {{ product.title }}
          </Typography>
          <Typography variant="priceLg">
            ${{ product.price }}
          </Typography>
        </div>

        <div class="flex items-center gap-6">
          <Typography variant="body">Select color:</Typography>
          <div class="flex gap-2">
            <button
              v-for="color in colors"
              :key="color.id"
              :class="['w-8 h-8 rounded-full transition-transform hover:scale-110', color.class]"
              :aria-label="`${color.name} color`"
            />
          </div>
        </div>

        <div class="flex flex-wrap gap-4">
          <Button
            v-for="capacity in capacities"
            :key="capacity"
            variant="option"
            :selected="selectedGb === capacity"
            @click="selectedGb = capacity"
          >
            {{ capacity }}
          </Button>
        </div>

        <div class="flex flex-wrap gap-4">
          <div
            v-for="specification in specifications"
            :key="specification.title"
            class="min-w-42 flex-1 flex items-center gap-2 bg-product-attributes rounded-[7px] p-4"
          >
            <Icon :name="specification.icon" size="lg" class="text-product-attributes-icon" />
            <div>
              <Typography variant="description">{{ specification.title }}</Typography>
              <Typography variant="description">{{ specification.value }}</Typography>
            </div>
          </div>
        </div>

        <Typography variant="description" class="max-w-xl">
          {{ product.description }}
        </Typography>
      </div>

      <div class="flex gap-4 mt-8">
        <Button class="w-65" variant="outline">Add to Wishlist</Button>
        <Button class="w-65">Add to Cart</Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Typography, Icon, Button } from "~/shared/ui";

const productImages = [
  "https://c.dns-shop.ru/thumb/st1/fit/0/0/d11418b29d34e7a7af996ecb9c716db5/e38ab5d5f2707bad34699e3ef919dabef58c7d3f1f6f0af61f4e1cde2601b5d3.jpg.webp",
  "https://c.dns-shop.ru/thumb/st1/fit/0/0/e8e45d091d1e887fd122748f5f92f731/34ac560ca7e47845cac4c328a993caf2f5956953710c12c88384e0ca789a54be.jpg.webp",
  "https://c.dns-shop.ru/thumb/st1/fit/0/0/c8756616c5522b7a30b36ac8e8e84f42/3512ff2d8615c92ddcd9c0f554b0d2e6775a281aa070fbd549c528920bb91ec4.jpg.webp",
  "https://c.dns-shop.ru/thumb/st1/fit/0/0/63fbc5338763534ee2b9d022c007b073/4b380065c2bb57c9b19efbb358cb5e2e696b5750841f225eb627b3516daf3d35.jpg.webp",
];

const selectedImage = ref(productImages[0]);

const product = {
  title: "Apple iPhone 14 Pro Max",
  description: "Enhanced capabilities thanks to an enlarged display of 6.7 inches and work without recharging throughout the day. Incredible photos in both low and bright light using the new dual-camera system.",
  price: 1399,
};

const selectedGb = ref("1TB");
const capacities = ["128GB", "256GB", "512GB", "1TB"];

const colors = [
  { id: "black", name: "Black", class: "bg-product-black" },
  { id: "purple", name: "Purple", class: "bg-product-purple" },
  { id: "red", name: "Red", class: "bg-product-red" },
  { id: "gold", name: "Gold", class: "bg-product-gold" },
  { id: "silver", name: "Silver", class: "bg-product-silver border border-gray-200" },
];

const specifications = [
  { icon: "screen-size-logo", title: "Screen size", value: '6.7"' },
  { icon: "logo-cpu", title: "CPU", value: "Apple A16 Bionic" },
  { icon: "core-logo", title: "Number of Cores", value: "6" },
  { icon: "product-camera-logo", title: "Main camera", value: "48-12-12 MP" },
  { icon: "product-camera-rotate", title: "Front-camera", value: "12 MP" },
  { icon: "battery-logo", title: "Battery capacity", value: "4323 mAh" },
];
</script>