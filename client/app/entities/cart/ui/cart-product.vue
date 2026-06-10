<template>
  <div class="w-full flex items-center justify-between py-10">
<div class="flex flex-1 items-center gap-6">      <img src="/images/IPad.png" :alt="title" class="h-22.5 w-22.5 object-contain" />

      <div class="grid gap-2">
        <Typography variant="cartTitle">
          Apple iPad 10.2" Wi-Fi 128GB Space Gray
        </Typography>

        <Typography variant="productSku">
          #25139526913984
        </Typography>
      </div>
    </div>

    <div class="flex items-center gap-8">
      <div class="flex items-center gap-6">
        <button class="text-4xl">
          <Icon name="noedit" size="md" />
        </button>

        <input :value="quantity" type="number" class="h-8 w-10 rounded-lg border text-center text-2xl" />

        <button class="text-4xl">
          <Icon name="edit" size="md" />

        </button>
      </div>

      <div class="text-right text-4xl font-medium">
        <Typography variant="productPrice">
          $1399
        </Typography>
      </div>

      <button>
        <Icon name="close_cart" size="md" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Typography } from '~/shared/ui/';
import Icon from '~/shared/ui/icon/icon.vue';

defineProps<{
  image: string;
  title: string;
  sku: string;
  quantity: number;
  price: number;
}>();
</script>