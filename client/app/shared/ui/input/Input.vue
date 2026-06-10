<template>
  <div class="grid gap-2">
    <label v-if="label" class="font-medium text-sm leading-4 text-cart-input-label">
      {{ label }}
    </label>

    <div class="flex items-center rounded-lg" :class="wrapperClasses">
      <div v-if="icon" :class="iconWrapperClasses">
        <Icon :name="icon" size="md" />
      </div>

      <input :value="modelValue" :placeholder="placeholder" :class="inputClasses"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Icon from "../icon/icon.vue";

interface Props {
  modelValue?: string;
  placeholder?: string;
  label?: string;
  icon?: string;
  variant?: "default" | "compact" | "comment" | "cart";
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  placeholder: "",
  label: "",
  icon: "",
  variant: "default",
});

defineEmits<{
  "update:modelValue": [value: string];
}>();

const wrapperClasses = computed(() => {
  switch (props.variant) {
    case "compact":
      return "bg-input w-full h-10";

    case "comment":
      return "h-[72px] border border-product-reviews-input rounded-[8px] px-6";

    case "cart":
      return "w-full h-16 border border-cart-input-border rounded-2xl p-[16px]";

    default:
      return "bg-input max-w-96 w-96 h-14";
  }
});

const iconWrapperClasses = computed(() => {
  if (props.variant === "compact") {
    return "pl-3";
  }

  return "py-4 pl-4";
});

const inputClasses = computed(() => {
  switch (props.variant) {
    case "compact":
      return "w-full h-full px-2 outline-none text-[14px] placeholder:text-placeholder";

    case "comment":
      return "w-full outline-none bg-transparent placeholder:text-placeholder";

    case "cart":
      return "w-full h-full bg-transparent outline-none text-base placeholder:text-placeholder";

    default:
      return "w-full h-full outline-none placeholder:text-placeholder";
  }
});
</script>