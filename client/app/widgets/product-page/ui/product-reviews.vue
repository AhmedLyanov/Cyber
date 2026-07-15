<template>
  <section class="px-40 py-22">
    <div class="grid gap-12">
      <Typography variant="h3">Reviews</Typography>
      <div v-if="totalReviews > 0" class="flex gap-15">
        <div class="w-[184px] h-[192px] bg-product-reviews-rating rounded-[16px] flex flex-col items-center justify-center">
          <Typography class="text-[56px] font-medium leading-none" variant="body">{{ averageRating }}</Typography>
          <Typography class="mt-4 text-product-description" variant="description">of {{ totalReviews }} reviews</Typography>
          <div class="flex gap-1 mt-6">
            <Icon v-for="i in 5" :key="i" :name="i <= Math.round(Number(averageRating)) ? 'star' : 'star-empty'" size="md" />
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
      <div v-if="isAuthenticated">
        <div class="flex items-center gap-2 mb-4">
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            @click="rating = star"
            @mouseenter="hoverRating = star"
            @mouseleave="hoverRating = 0"
            class="transition-transform hover:scale-110"
          >
            <Icon 
              :name="star <= (hoverRating || rating) ? 'star' : 'star-empty'" 
              size="lg"
              :class="star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'"
            />
          </button>
        </div>
        
        <form @submit.prevent="handleCreateReview" class="flex align-center gap-4 items-start">
          <div class="flex-1">
            <Input v-model="comment" placeholder="Leave Comment" variant="comment" />
          </div>
          <Button type="submit" :disabled="!rating || comment.length < 10">Submit</Button>
        </form>
      </div>
    </div>

    <div class="mt-8 grid gap-6">
      <ReviewCard v-for="review in reviews" :key="review.id" :review="review" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Typography, Icon, Input, Button } from "~/shared/ui";
import ReviewCard from "~/entities/review/ui/review-card.vue";
import { reviewAPI } from "~/entities/review/api/review.api";

const props = defineProps<{
  productId: string;
  currentUserId?: string;
  isAuthenticated?: boolean;
}>();

const reviews = ref([]);
const ratingStats = ref([
  { label: 'Excellent', value: 0, percent: 0 },
  { label: 'Good', value: 0, percent: 0 },
  { label: 'Average', value: 0, percent: 0 },
  { label: 'Below Average', value: 0, percent: 0 },
  { label: 'Poor', value: 0, percent: 0 }
]);
const averageRating = ref("0");
const totalReviews = ref(0);
const rating = ref(0);
const hoverRating = ref(0);
const comment = ref("");

const fetchReviews = async () => {
  try {
    const data = await reviewAPI.getProductReviews(props.productId);
    
    reviews.value = data.reviews.map(r => ({
      id: r._id,
      author: r.user?.name || "Anonymous",
      avatar: r.user?.avatar || "",
      rating: r.rating,
      date: new Date(r.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      comment: r.comment,
      userId: r.user?._id || "",
    }));
    
    averageRating.value = data.averageRating;
    totalReviews.value = data.pagination.total;
    
    if (data.stats && data.stats.length > 0) {
      ratingStats.value = data.stats;
    }
  } catch (err) {
    console.error("Failed to fetch reviews:", err);
  }
};

const handleCreateReview = async () => {
  if (!rating.value || comment.value.length < 10) return;
  
  try {
    await reviewAPI.createReview(props.productId, {
      rating: rating.value,
      comment: comment.value,
    });
    
    rating.value = 0;
    comment.value = "";
    await fetchReviews();
  } catch (err: any) {
    console.error("Failed to create review:", err);
    alert(err.data?.message || "Failed to create review");
  }
};

onMounted(() => {
  fetchReviews();
});
</script>