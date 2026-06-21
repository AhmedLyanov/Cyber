import { useApi } from "~/shared/core/client";
import type { Product } from "../model/types";

export const getProduct = async (id: string) => {
  const api = useApi();

  return api<{ product: Product }>(`/product/detailed/${id}`);
};