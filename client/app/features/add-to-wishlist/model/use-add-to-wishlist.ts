import { useMutation, useQueryClient } from "@tanstack/vue-query";

import { wishlistApi } from "~/entities/wishlist/api/wishlist.api";

interface AddToWishlistPayload {
  productId: string;
}

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: AddToWishlistPayload) =>
      wishlistApi.addToWishlist(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist"],
      });

      console.log("Wishlist updated");
    },

    onError: (error) => {
      console.error("Wishlist error:", error);
    },
  });


  return {
    addToWishlist: mutation.mutate,
    isPending: mutation.isPending,
  };
};