import { useApi } from "~/shared/core/client";

export interface CartItem {
  _id?: string;
  productId: string; 
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

export interface CartResponse {
  cart: Cart;
  message?: string;
}

export interface AddToCartDto {
  productId: string;
  quantity?: number;
}

export interface UpdateQuantityDto {
  productId: string;
  quantity: number;
}

class CartApi {
  private get api() {
    return useApi();
  }

  async getCart(): Promise<CartResponse> {
    const response = await this.api<CartResponse>("/cart/");
    return response;
  }

  async addToCart(data: AddToCartDto): Promise<{ message: string; cart: Cart }> {
    const response = await this.api<{ message: string; cart: Cart }>("/cart/add", {
      method: 'POST',
      body: data,
    });
    return response;
  }

  async removeFromCart(productId: string): Promise<{ message: string; cart: Cart }> {
    const response = await this.api<{ message: string; cart: Cart }>(`/cart/remove/${productId}`, {
      method: 'DELETE',
    });
    return response;
  }

  async updateQuantity(data: UpdateQuantityDto): Promise<{ message: string; cart: Cart }> {
    const response = await this.api<{ message: string; cart: Cart }>("/cart/update", {
      method: 'PUT',
      body: data,
    });
    return response;
  }

  async clearCart(): Promise<{ message: string }> {
    const response = await this.api<{ message: string }>("/cart/clear", {
      method: 'DELETE',
    });
    return response;
  }
}

export const cartApi = new CartApi();