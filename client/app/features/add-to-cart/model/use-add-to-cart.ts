import { useMutation } from "@tanstack/vue-query";
import { cartApi } from "~/entities/cart/api/cart.api";
import type { AddToCartDto } from "~/entities/cart/api/cart.api";

export const useAddToCart = () => {
  const mutation = useMutation({
    mutationFn: (data: AddToCartDto) =>
      cartApi.addToCart(data),

    onSuccess: () => {
      console.log("SUCCESS");
    },

    onError: (error) => {
      console.error(error);
    },
  });

  return {
    addToCart: mutation.mutate,
    isPending: mutation.isPending,
  };
};