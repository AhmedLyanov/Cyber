<script setup lang="ts">
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "option";

interface Props {
  variant?: ButtonVariant;
  disabled?: boolean;
  selected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  disabled: false,
  selected: false,
});

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:opacity-90",

  secondary:
    "bg-black text-white hover:opacity-90",

  outline:
    "border border-current bg-transparent hover:bg-black hover:text-white",

  option:
    "w-[122px] h-[56px] border border-product-card-gb-noactive bg-transparent text-product-card-gb-text-noactive hover:border-product-card-gb-active hover:text-product-card-gb-text-active",
};
</script>

<template>
  <button
    :disabled="disabled"
    class="inline-flex items-center justify-center rounded-md px-6 py-3 font-medium transition-all duration-200 cursor-pointer"
    :class="[
      variants[variant],

      variant === 'option' && selected &&
        'border-product-card-gb-active text-product-card-gb-text-active',

      disabled && 'opacity-50 cursor-not-allowed'
    ]"
  >
    <slot />
  </button>
</template>