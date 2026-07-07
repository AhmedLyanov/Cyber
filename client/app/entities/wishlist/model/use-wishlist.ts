import { useMutation, useQuery } from "@tanstack/vue-query";

import { wishlistApi } from "../api/wishlist.api";


export const useWishlist = () => {


  const wishlistQuery = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => wishlistApi.getWishlist(),
  });



  const addMutation = useMutation({
    mutationFn: wishlistApi.addToWishlist,
  });



  const removeMutation = useMutation({
    mutationFn: wishlistApi.removeFromWishlist,
  });



  return {

    wishlist: wishlistQuery.data,

    isLoading: wishlistQuery.isLoading,


    addToWishlist: addMutation.mutate,

    removeFromWishlist: removeMutation.mutate,

  };
};