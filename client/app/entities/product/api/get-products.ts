import type {
  ProductsResponse,
  ProductFilters,
} from "../model/types";

import { useApi } from "~/shared/core/client";

export const getProducts = async (
  filters: ProductFilters = {}
): Promise<ProductsResponse> => {
  const api = useApi();

  const params = new URLSearchParams();

  if (filters.page) {
    params.append("page", String(filters.page));
  }

  if (filters.limit) {
    params.append("limit", String(filters.limit));
  }

  if (filters.brand) {
    params.append("brand", filters.brand);
  }

  if (filters.type) {
    params.append("type", filters.type);
  }

  if (filters.search) {
    params.append("search", filters.search);
  }

  if (filters.minPrice !== undefined) {
    params.append("minPrice", String(filters.minPrice));
  }

  if (filters.maxPrice !== undefined) {
    params.append("maxPrice", String(filters.maxPrice));
  }

  const query = params.toString();

  return api<ProductsResponse>(
    `product/products${query ? `?${query}` : ""}`
  );
};