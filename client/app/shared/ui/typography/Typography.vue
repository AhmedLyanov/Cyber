<script setup lang="ts">
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h2Hero"
  | "h3"
  | "titleLg"
  | "priceLg"
  | "productTitle"
  | "productPrice"
  | "productSku"
  | "description"
  | "body"
  | "bodySm"
  | "bodyLg"
  | "textBase"
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

  h2Hero: "text-[94px] leading-none",

  h3: "text-2xl",

  titleLg:
    "font-bold text-[40px] leading-[40px]",

  priceLg:
    "font-medium text-[32px] leading-[48px] tracking-[0.03em]",

  productTitle:
    "font-medium text-base leading-6",

  productPrice:
    "font-medium text-[20px] leading-8 tracking-[0.03em]",

  productSku:
    "font-regular text-[14px] leading-6 ",

  description:
    "font-normal text-[14px] leading-[24px] tracking-[0.03em] text-gray",

  body:
    "text-base",

  bodySm:
    "text-sm leading-6 text-gray",

  bodyLg:
    "text-[18px] leading-7 text-gray",

  textBase:
    "font-normal text-[15px] leading-[24px]",

  navigation:
    "text-base transition-opacity duration-200 hover:opacity-70",

  caption:
    "text-sm text-gray-500",

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