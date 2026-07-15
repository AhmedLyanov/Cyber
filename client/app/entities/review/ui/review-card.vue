<template>
  <div class="flex gap-6 border-b bg-product-reviews-comment-bg px-4 py-6">
    <img
      :src="review.avatar || '/images/Image-not-found.png'"
      :alt="review.author"
      class="w-14 h-14 rounded-full object-cover shrink-0"
      @error="handleImageError"
    />

    <div class="flex-1">
      <div class="flex justify-between items-start">
        <div>
          <Typography variant="h3" class="text-[17px] mb-3">
            {{ review.author }}
          </Typography>

          <div class="flex gap-1 mb-4">
            <Icon
              v-for="star in review.rating"
              :key="star"
              name="star"
              size="md"
              class="w-6 h-6"
            />
            <Icon
              v-for="emptyStar in 5 - review.rating"
              :key="'empty-' + emptyStar"
              name="star-empty"
              size="md"
              class="w-6 h-6 opacity-30"
            />
          </div>
        </div>

        <div class="flex items-center gap-4">
          <Typography variant="description" class="text-product-description">
            {{ review.date }}
          </Typography>

          <!-- Action buttons -->
          <div v-if="canModify" class="flex gap-2">
            <button
              @click="$emit('edit', review.id)"
              class="text-blue-500 hover:text-blue-700"
            >
              <Icon name="edit" size="sm" />
            </button>
            <button
              @click="$emit('delete', review.id)"
              class="text-red-500 hover:text-red-700"
            >
              <Icon name="close-cart" size="sm" />
            </button>
          </div>
        </div>
      </div>

      <Typography variant="description" class="leading-8">
        {{ review.comment }}
      </Typography>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Typography, Icon } from "~/shared/ui";

const props = defineProps<{
  review: {
    id: string;
    author: string;
    avatar: string;
    rating: number;
    date: string;
    comment: string;
    userId: string;
  };
  currentUserId?: string;
  canModify?: boolean;
}>();

defineEmits<{
  edit: [reviewId: string];
  delete: [reviewId: string];
}>();

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = "/images/Image-not-found.png";
};
</script>