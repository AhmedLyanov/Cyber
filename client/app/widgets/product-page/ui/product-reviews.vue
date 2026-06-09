<template>
  <section class="px-40 py-22">
    <div class="grid gap-12">
      <Typography variant="h3">Reviews</Typography>

      <div class="flex gap-15">
        <div class="w-[184px] h-[192px] bg-product-reviews-rating rounded-[16px] flex flex-col items-center justify-center">
          <Typography class="text-[56px] font-medium leading-none" variant="body">4.8</Typography>
          <Typography class="mt-4 text-product-description" variant="description">of 125 reviews</Typography>
          <div class="flex gap-1 mt-6">
            <Icon name="star" size="md"  />
            <Icon name="star" size="md"/>
            <Icon name="star" size="md"  />
            <Icon name="star" size="md"  />
            <Icon name="star-half" size="md" />
          </div>
        </div>

        <div class="flex-1 grid gap-4">
          <div v-for="item in ratingStats" :key="item.label" class="grid grid-cols-[180px_1fr_40px] items-center gap-4">
            <Typography variant="body">{{ item.label }}</Typography>
            <div class="h-[6px] rounded-full bg-product-reviews-rating-empty overflow-hidden">
              <div class="h-full rounded-full bg-product-reviews-rating-fill" :style="{ width: `${item.percent}%` }" />
            </div>
            <Typography class="text-right text-product-description" variant="description">{{ item.value }}</Typography>
          </div>
        </div>
      </div>

      <Input placeholder="Leave Comment" variant="comment" />
    </div>

    <div class="mt-8 grid gap-6">
      <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Typography, Icon, Input } from "~/shared/ui";
import ReviewCard from "~/entities/review/ui/review-card.vue";

const reviews = [
  {
    id: 1,
    author: "Grace Carey",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    date: "24 January,2023",
    comment: "I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn't be happier with my purchase!!"
  },
  {
    id: 2,
    author: "Ronald Richards",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    date: "24 January,2023",
    comment: "This phone has 1T storage and is durable."
  }
];

const ratingStats = [
  { label: 'Excellent', value: 100, percent: 98 },
  { label: 'Good', value: 11, percent: 55 },
  { label: 'Average', value: 3, percent: 22 },
  { label: 'Below Average', value: 8, percent: 46 },
  { label: 'Poor', value: 1, percent: 9 }
];
</script>