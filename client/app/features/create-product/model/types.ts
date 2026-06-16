export type ProductType = 'smartphones' | 'tablets' | 'laptops' | 'accessoryes'
export type ProductBrand = 'apple' | 'samsung' | 'xiaomi' | 'google' | 'oneplus'
export type ScreenType = 'AMOLED' | 'OLED' | 'IPS' | 'Retina'
export type ScreenDiagonal = '6.1' | '6.5"' | '6.7"' | '6.9"'
export type BatteryCapacity = '3000mAh' | '4000mAh' | '5000mAh' | '6000mAh'
export type BuiltInMemory = '64GB' | '128GB' | '256GB' | '512GB'
export type ProtectionClass = 'IP67' | 'IP68' | 'IP69'
export type CpuType = 'A16 Bionic' | 'Snapdragon 8 Gen 2' | 'Dimensity 9200' | 'Apple M2'

export interface ProductSpecs {
  screenType?: ScreenType
  screenDiagonal?: ScreenDiagonal
  batteryCapacity?: BatteryCapacity
  builtInMemory?: BuiltInMemory
  protectionClass?: ProtectionClass
  cpu?: CpuType
}

export interface CreateProductDto {
  title: string
  description: string
  price: number
  type: ProductType
  brand: ProductBrand
  image?: File | string
  originalPrice?: number
  discountPercentage?: number
  discountStart?: string | null
  discountEnd?: string | null
  specs: ProductSpecs
}

export interface Product {
  _id: string
  title: string
  description: string
  price: number
  type: ProductType
  brand: ProductBrand
  image: string
  specs: ProductSpecs
  originalPrice: number
  discountPercentage: number
  hasDiscount: boolean
  discountStart: string | null
  discountEnd: string | null
  isDiscountActive: boolean
  owner: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T = any> {
  message: string
  product?: T
  products?: T[]
  count?: number
  [key: string]: any
}

export const PRODUCT_TYPES: ProductType[] = ['smartphone', 'tablet', 'laptops', 'accessory']
export const PRODUCT_BRANDS: ProductBrand[] = ['apple', 'samsung', 'Xiaomi', 'Google', 'OnePlus']
export const SCREEN_TYPES: ScreenType[] = ['AMOLED', 'OLED', 'IPS', 'Retina']
export const SCREEN_DIAGONALS: ScreenDiagonal[] = ['6.1', '6.5"', '6.7"', '6.9"']
export const BATTERY_CAPACITIES: BatteryCapacity[] = ['3000mAh', '4000mAh', '5000mAh', '6000mAh']
export const BUILT_IN_MEMORIES: BuiltInMemory[] = ['64GB', '128GB', '256GB', '512GB']
export const PROTECTION_CLASSES: ProtectionClass[] = ['IP67', 'IP68', 'IP69']
export const CPU_TYPES: CpuType[] = ['A16 Bionic', 'Snapdragon 8 Gen 2', 'Dimensity 9200', 'Apple M2']