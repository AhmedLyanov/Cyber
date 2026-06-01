<script setup lang="ts">
type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "bodySm"
  | "bodyLg"
  | "caption"
  | "navigation"
  | "footer";
  

interface Props {
  as?: string;
  variant?: TypographyVariant;
}

withDefaults(defineProps<Props>(), {
  as: "p",
  variant: "body",
});

const variants: Record<TypographyVariant, string> = {
  h1: "text-5xl font-medium",
  h2: "text-4xl font-medium",
  h3: "text-2xl font-medium",
  body: "text-base",
  bodySm: "text-sm",
  bodyLg: "text-lg",
  navigation:
    "font-medium text-base transition-opacity duration-200 hover:opacity-70",

  caption: "text-sm text-gray-500",
  footer: "text-[14px] text-footer-text hover:text-white transition-colors"
};
</script>

<template>
  <component
    :is="as"
    :class="variants[variant]"
  >
    <slot />
  </component>
</template>