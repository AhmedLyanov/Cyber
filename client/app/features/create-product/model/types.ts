export type ProductType = 'smartphones' | 'tablets' | 'laptops' | 'accessories'
export type ProductBrand = 'apple' | 'samsung' | 'xiaomi' | 'google' | 'oneplus'
export type ScreenType = 'amoled' | 'oled' | 'ips' | 'retina'
export type ScreenDiagonal = '6.1' | '6.5' | '6.7' | '6.9'
export type BatteryCapacity = '3000mah' | '4000mah' | '5000mah' | '6000mah'
export type BuiltInMemory = '64gb' | '128gb' | '256gb' | '512gb'
export type ProtectionClass = 'ip67' | 'ip68' | 'ip69'
export type CpuType = 'a16 bionic' | 'snapdragon 8 gen 2' | 'dimensity 9200' | 'apple m2'

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

export const PRODUCT_TYPES: ProductType[] = ['smartphones', 'tablets', 'laptops', 'accessories']
export const PRODUCT_BRANDS: ProductBrand[] = ['apple', 'samsung', 'xiaomi', 'google', 'oneplus']
export const SCREEN_TYPES: ScreenType[] = ['amoled', 'oled', 'ips', 'retina']
export const SCREEN_DIAGONALS: ScreenDiagonal[] = ['6.1', '6.5', '6.7', '6.9']
export const BATTERY_CAPACITIES: BatteryCapacity[] = ['3000mah', '4000mah', '5000mah', '6000mah']
export const BUILT_IN_MEMORIES: BuiltInMemory[] = ['64gb', '128gb', '256gb', '512gb']
export const PROTECTION_CLASSES: ProtectionClass[] = ['ip67', 'ip68', 'ip69']
export const CPU_TYPES: CpuType[] = ['a16 bionic', 'snapdragon 8 gen 2', 'dimensity 9200', 'apple m2']