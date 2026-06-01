<script setup lang="ts">
import { Typography, Button } from "~/shared/ui";

type TypographyVariant =
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
  title: string;
  subtitle?: string;
  description: string;

  titleVariant?: TypographyVariant;
  descriptionVariant?: TypographyVariant;

  dark?: boolean;
  showButton?: boolean;
  buttonText?: string;
}

withDefaults(defineProps<Props>(), {
  titleVariant: "h2",
  descriptionVariant: "bodySm",
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-baseline gap-2 flex-wrap">
      <Typography
        as="h3"
        :variant="titleVariant"
        class="font-extralight"
        :class="{ 'text-white': dark }"
      >
        {{ title }}
      </Typography>

      <Typography
        v-if="subtitle"
        as="span"
        :variant="titleVariant"
        class="font-semibold"
        :class="{ 'text-white': dark }"
      >
        {{ subtitle }}
      </Typography>
    </div>

    <Typography
      :variant="descriptionVariant"
    >
      {{ description }}
    </Typography>

    <Button
      v-if="showButton"
      variant="outline"
      :class="{
        'border-white text-white hover:bg-white hover:text-black': dark,
      }"
    >
      {{ buttonText || "Shop Now" }}
    </Button>
  </div>
</template>