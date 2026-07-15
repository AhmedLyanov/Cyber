import { ref, computed } from "vue";
import { reviewAPI } from "../api/review.api";
import type { Review, RatingStats } from "./types";
import type { ReviewDTO } from "../api/review.api";

export function useReviews(productId: string) {
  const reviews = ref<Review[]>([]);
  const ratingStats = ref<RatingStats[]>([]);
  const averageRating = ref<string>("0");
  const totalReviews = ref<number>(0);
  const currentPage = ref<number>(1);
  const totalPages = ref<number>(1);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const userReview = ref<Review | null>(null);

  const mapReviewDTO = (dto: ReviewDTO): Review => ({
    id: dto._id,
    author: dto.user?.name || "Anonymous",
    avatar: dto.user?.avatar || "",
    rating: dto.rating,
    date: new Date(dto.createdAt).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    comment: dto.comment,
    userId: dto.user?._id || "",
  });

  const fetchReviews = async (page = 1) => {
    if (!productId) return;

    isLoading.value = true;
    error.value = null;

    try {
      const response = await reviewAPI.getProductReviews(productId, {
        page,
        limit: 10,
      });

      reviews.value = response.reviews.map(mapReviewDTO);
      averageRating.value = response.averageRating;
      totalReviews.value = response.pagination.total;
      currentPage.value = response.pagination.page;
      totalPages.value = response.pagination.pages;
      ratingStats.value = response.stats;
    } catch (err: any) {
      error.value =
        err.response?.data?.message || "Failed to fetch reviews";
      console.error("Fetch reviews error:", err);
    } finally {
      isLoading.value = false;
    }
  };

  const createReview = async (rating: number, comment: string) => {
    try {
      const response = await reviewAPI.createReview(productId, {
        rating,
        comment,
      });
      const newReview = mapReviewDTO(response.review);
      userReview.value = newReview;
      await fetchReviews(currentPage.value);
      return newReview;
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Failed to create review";
      error.value = message;
      throw new Error(message);
    }
  };

  const updateReview = async (reviewId: string, rating?: number, comment?: string) => {
    try {
      const response = await reviewAPI.updateReview(reviewId, {
        ...(rating && { rating }),
        ...(comment && { comment }),
      });
      const updatedReview = mapReviewDTO(response.review);
      userReview.value = updatedReview;
      await fetchReviews(currentPage.value);
      return updatedReview;
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Failed to update review";
      error.value = message;
      throw new Error(message);
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      await reviewAPI.deleteReview(reviewId);
      userReview.value = null;
      await fetchReviews(currentPage.value);
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Failed to delete review";
      error.value = message;
      throw new Error(message);
    }
  };

  const findUserReview = (userId: string) => {
    userReview.value =
      reviews.value.find((review) => review.userId === userId) || null;
  };

  return {
    reviews,
    ratingStats,
    averageRating,
    totalReviews,
    currentPage,
    totalPages,
    isLoading,
    error,
    userReview,
    fetchReviews,
    createReview,
    updateReview,
    deleteReview,
    findUserReview,
  };
}