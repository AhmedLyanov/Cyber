<template>
  <div class="flex gap-6 border-b bg-product-reviews-comment-bg px-4 py-6">
    <img :src="review.avatar" :alt="review.author" class="w-14 h-14 rounded-full object-cover shrink-0" />

    <div class="flex-1">
      <div class="flex justify-between items-start">
        <div>
          <Typography variant="h3" class="text-[17px] mb-3">
            {{ review.author }}
          </Typography>

          <div class="flex gap-1 mb-4">
            <Icon v-for="star in review.rating" :key="star" name="star" size="md" class="w-6 h-6" />
          </div>
        </div>

        <Typography variant="description" class="text-product-description">
          {{ review.date }}
        </Typography>
      </div>

      <Typography variant="description" class="leading-8">
        {{ review.comment }}
      </Typography>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Typography, Icon } from "~/shared/ui";

defineProps<{
  review: {
    id: number;
    author: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
  };
}>();
</script>