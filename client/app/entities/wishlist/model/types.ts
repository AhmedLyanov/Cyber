import type { Product } from "~/entities/product/model/types";

export interface Wishlist {
  _id: string;
  userId: string;
  products: Product[];
  createdAt?: string;
  updatedAt?: string;
}

export interface WishlistResponse {
  wishlist: Wishlist;
}