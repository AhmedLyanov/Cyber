import { ref } from 'vue'
import { productApi } from '../api/product.api'
import type { CreateProductDto, Product, ApiResponse } from './types'

export const useCreateProduct = () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const createdProduct = ref<Product | null>(null)

  const createProduct = async (formData: FormData): Promise<ApiResponse<Product>> => {
    isLoading.value = true
    error.value = null

    try {
      const response = await productApi.createProduct(formData)
      createdProduct.value = response.product || null
      return response
    } catch (err: any) {
      error.value = err.message || 'Failed to create product'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const resetState = () => {
    isLoading.value = false
    error.value = null
    createdProduct.value = null
  }

  return {
    isLoading,
    error,
    createdProduct,
    createProduct,
    resetState,
  }
}