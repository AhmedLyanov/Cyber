import type { ProductsResponse } from "../model/types";
import {useApi} from "~/shared/core/client";

export const getProducts = async (): Promise<ProductsResponse> => {
  const api = useApi()
  
  return api<ProductsResponse>('product/products')
};