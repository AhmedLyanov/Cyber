<script setup lang="ts">
type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost";

interface Props {
  variant?: ButtonVariant;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
  disabled: false,
});

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:opacity-90",

  secondary:
    "bg-black text-white hover:opacity-90",

  outline:
    "border border-current bg-transparent hover:bg-black hover:text-white",

  ghost:
    "bg-transparent hover:bg-gray-100",
};
</script>

<template>
  <button
    :disabled="disabled"
    class="inline-flex items-center justify-center rounded-md px-6 py-3 font-medium transition-all duration-200 cursor-pointer"
    :class="[
      variants[variant],
      disabled && 'opacity-50 cursor-not-allowed'
    ]"
  >
    <slot />
  </button>
</template>