import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";

import { computed, watchEffect } from "vue";

import { wishlistApi } from "../api/wishlist.api";

export const useWishlist = () => {
  const queryClient = useQueryClient();

  const wishlistQuery = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => wishlistApi.getWishlist(),
  });

  const addMutation = useMutation({
    mutationFn: (data: { productId: string }) =>
      wishlistApi.addToWishlist(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },

    onError: (error) => {
      console.error("ADD ERROR:", error);
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) =>
      wishlistApi.removeFromWishlist(productId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });
    },

    onError: (error) => {
      console.error("REMOVE ERROR:", error);
    },
  });

  const wishlistIds = computed(() => {
    return (
      wishlistQuery.data.value?.wishlist.products.map(
        (product) => product._id,
      ) ?? []
    );
  });

  watchEffect(() => {
});
  const isInWishlist = (productId: string) => {
    return wishlistIds.value.includes(productId);
  };

  return {
    wishlist: wishlistQuery.data,
    isLoading: wishlistQuery.isLoading,

    addToWishlist: addMutation.mutate,
    removeFromWishlist: removeMutation.mutate,

    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,

    isInWishlist,
  };
};