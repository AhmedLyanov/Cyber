<script setup lang="ts">
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h2Hero"
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
  h1: "text-5xl",

  h2: "text-4xl",

  h2Hero: "text-[64px] leading-none",

  h3: "text-2xl",

  body: "text-base",

  bodySm: "text-sm leading-6 text-gray",

  bodyLg: "text-[18px] leading-7 text-gray",
  navigation:
    "text-base transition-opacity duration-200 hover:opacity-70",

  caption: "text-sm text-gray-500",

  footer:
    "text-[14px] text-footer-text hover:text-white transition-colors",
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