import type { Product } from "~/entities/product/model/types";

export interface CartItem {
  _id?: string;
  productId: string | Product;
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  total: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartWithProducts extends Omit<Cart, 'items'> {
  items: (CartItem & { productId: Product })[];
}