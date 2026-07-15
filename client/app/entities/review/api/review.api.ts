import { useApi } from "~/shared/core/client";

export interface ReviewDTO {
  _id: string;
  product: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  message: string;
  reviews: ReviewDTO[];
  averageRating: string;
  stats: Array<{
    label: string;
    value: number;
    percent: number;
  }>;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const reviewAPI = {
  getProductReviews: async (productId: string, params?: { page?: number; limit?: number }) => {
    const api = useApi();
    return api(`/review/product/${productId}`, {
      method: "GET",
      query: params,
    });
  },

  createReview: async (productId: string, reviewData: { rating: number; comment: string }) => {
    const api = useApi();
    return api(`/review/product/${productId}`, {
      method: "POST",
      body: reviewData,
    });
  },

  updateReview: async (reviewId: string, reviewData: { rating?: number; comment?: string }) => {
    const api = useApi();
    return api(`/review/${reviewId}`, {
      method: "PUT",
      body: reviewData,
    });
  },

  deleteReview: async (reviewId: string) => {
    const api = useApi();
    return api(`/review/${reviewId}`, {
      method: "DELETE",
    });
  },
};