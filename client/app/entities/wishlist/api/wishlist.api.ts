import { useApi } from "~/shared/core/client";
import type { WishlistResponse } from "../model/types";


interface AddToWishlistDto {
  productId: string;
}


class WishlistApi {

  private get api() {
    return useApi();
  }


  async getWishlist(): Promise<WishlistResponse> {
    return await this.api("/wishlist/");
  }


  async addToWishlist(
    data: AddToWishlistDto
  ): Promise<WishlistResponse> {
    return await this.api("/wishlist/add", {
      method: "POST",
      body: data,
    });
  }


  async removeFromWishlist(
    productId: string
  ): Promise<WishlistResponse> {

    return await this.api(
      `/wishlist/remove/${productId}`,
      {
        method: "DELETE",
      }
    );
  }
}


export const wishlistApi = new WishlistApi();