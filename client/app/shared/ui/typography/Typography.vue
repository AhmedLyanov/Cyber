<script setup lang="ts">
interface Props {
  as?: string;
  variant?: "h1" | "h2" | "h3" | "body" | "caption" | "navigation";
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: "p",
  variant: "body",
});

const variants = {
  h1: "text-5xl font-medium",
  h2: "text-4xl font-medium",
  h3: "text-2xl font-medium",
  body: "text-base",
  navigation: "font-medium text-[16px] text-primary hover:opacity-30",
  caption: "text-sm text-gray-500",
};
</script>

<template>
  <component
    :is="as"
    :class="[variants[variant], props.class]"
  >
    <slot />
  </component>
</template>