import { useApi, handleApiResponse } from '~/shared/core/client'
import type { CreateProductDto, Product, ApiResponse } from '../model/types'

export const productApi = {
  async createProduct(formData: FormData): Promise<ApiResponse<Product>> {
    const api = useApi()
    
    return handleApiResponse(
      api<ApiResponse<Product>>('/product/create', {
        method: 'POST',
        body: formData,
      })
    )
  },


  async getProducts(params?: Record<string, any>): Promise<ApiResponse<Product[]>> {
    const api = useApi()
    const query = new URLSearchParams(params).toString()
    
    return handleApiResponse(
      api<ApiResponse<Product[]>>(`/products${query ? `?${query}` : ''}`)
    )
  },



  async getProductById(id: string): Promise<ApiResponse<Product>> {
    const api = useApi()
    
    return handleApiResponse(
      api<ApiResponse<Product>>(`/products/${id}`)
    )
  },

  

  async updateProduct(id: string, data: Partial<CreateProductDto>): Promise<ApiResponse<Product>> {
    const api = useApi()
    
    return handleApiResponse(
      api<ApiResponse<Product>>(`/products/${id}`, {
        method: 'PUT',
        body: data,
      })
    )
  },



  
  async deleteProduct(id: string): Promise<ApiResponse> {
    const api = useApi()
    
    return handleApiResponse(
      api<ApiResponse>(`/products/${id}`, {
        method: 'DELETE',
      })
    )
  },
}