<script setup lang="ts">
import { Typography, Button } from '~/shared/ui'

interface Props {
  title: string
  description: string

  dark?: boolean
  showButton?: boolean
  buttonText?: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <Typography
      as="h3"
      variant="h2"
    >
      {{ title }}
    </Typography>

    <Typography
      variant="bodySm"
      class="text-gray"
    >
      {{ description }}
    </Typography>

    <Button
      v-if="showButton"
      variant="outline"
      class="w-fit"
    >
      {{ buttonText || 'Shop Now' }}
    </Button>
  </div>
</template>