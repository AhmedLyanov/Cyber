
<template>
  <div class="w-full flex items-center justify-between py-10">
    <div class="flex flex-1 items-center gap-6">
      <img
        :src="productImage"
        :alt="title"
        class="w-22.5 h-22.5 object-contain"
        @error="handleImageError"
      />

      <div class="grid gap-2">
        <Typography variant="cartTitle">
          {{ title }}
        </Typography>

        <Typography variant="productSku">
          #{{ sku || productId.slice(-8) }}
        </Typography>
      </div>
    </div>

    <div class="flex items-center gap-8">
      <div class="flex items-center gap-6 select-none">
        <button
          @click="decreaseQuantity"
          :disabled="isLoading || localQuantity <= 1"
        >
          <Icon name="noedit" size="md" />
        </button>

        <input
          :value="localQuantity"
          type="number"
          min="1"
          class="w-10 h-8 border rounded-lg text-center"
          :disabled="isLoading"
          @change="handleQuantityChange"
        />

        <button
          @click="increaseQuantity"
          :disabled="isLoading"
        >
          <Icon name="edit" size="md" />
        </button>
      </div>

      <Typography variant="productPrice">
        {{ formattedPrice }}
      </Typography>

      <button
        @click="handleRemove"
        :disabled="isLoading"
      >
        <Icon name="delete_card" size="md" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Typography } from "~/shared/ui";
import Icon from "~/shared/ui/icon/icon.vue";
import { useCartStore } from "../model/use-cart";

const props = defineProps<{
  productId: string;
  title: string;
  image?: string;
  sku?: string;
  quantity: number;
  price: number;
}>();

const emit = defineEmits<{
  (e: "remove", productId: string): void;
  (e: "error", message: string): void;
}>();

const cartStore = useCartStore();

const config = useRuntimeConfig();

const isLoading = ref(false);
const localQuantity = ref(props.quantity);

const formattedPrice = computed(() => {
  const totalPrice =
    props.price * localQuantity.value;

  return new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }
  ).format(totalPrice);
});

const productImage = computed(() => {
  if (!props.image) {
    return "/images/Image-not-found.png";
  }

  if (props.image.startsWith("http")) {
    return props.image;
  }

  return `${config.public.apiBase}/uploads/products/${props.image}`;
});

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  img.src = "/images/Image-not-found.png";
};

const updateQuantity = async (newQuantity: number) => {
  if (isLoading.value) return;

  try {
    isLoading.value = true;
    localQuantity.value = newQuantity;

    await cartStore.updateQuantity(
      props.productId,
      newQuantity
    );
  } catch (error: any) {
    localQuantity.value = props.quantity;

    emit(
      "error",
      error.message || "Failed to update quantity"
    );
  } finally {
    isLoading.value = false;
  }
};

const decreaseQuantity = async () => {
  if (localQuantity.value <= 1) return;

  await updateQuantity(
    localQuantity.value - 1
  );
};

const increaseQuantity = async () => {
  await updateQuantity(
    localQuantity.value + 1
  );
};

const handleQuantityChange = async (
  event: Event
) => {
  const input =
    event.target as HTMLInputElement;

  let value = Number(input.value);

  if (isNaN(value) || value < 1) {
    value = 1;
  }

  await updateQuantity(value);
};


const handleRemove = async () => {
  if (isLoading.value) return;

  try {
    isLoading.value = true;

    await cartStore.removeFromCart(
      props.productId
    );

    emit("remove", props.productId);
  } catch (error: any) {
    emit(
      "error",
      error.message || "Failed to remove item"
    );
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => props.quantity,
  (value) => {
    localQuantity.value = value;
  }
);
</script>
<style>

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="number"]::-ms-clear {
  display: none;
}

</style>