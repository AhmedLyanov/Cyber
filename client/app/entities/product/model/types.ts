export type ProductType =
  | "smartphones"
  | "laptops"
  | "tablets"
  | "accessories";

export type ProductBrand =
  | "apple"
  | "samsung"
  | "xiaomi"
  | "poco"
  | "oppo"
  | "honor"
  | "motorola"
  | "nokia"
  | "realme"
  | "thunderobot";

export type ProtectionClass =
  | "IP67"
  | "IP68"
  | "IP69";

export type ScreenType =
  | "LCD"
  | "OLED"
  | "AMOLED";

export type ScreenDiagonal =
  | "5.0"
  | "5.4"
  | "5.8"
  | "6.1"
  | "6.7"
  | "7.0";

export type BatteryCapacity =
  | "3000mAh"
  | "3500mAh"
  | "4000mAh"
  | "4500mAh"
  | "5000mAh"
  | "5500mAh"
  | "6000mAh"
  | "7000mAh";

export type BuiltInMemory =
  | "32GB"
  | "64GB"
  | "128GB"
  | "256GB"
  | "512GB"
  | "1TB";

export type CpuType =
  | "Snapdragon 8 Gen 2"
  | "Snapdragon 8 Gen 1"
  | "Snapdragon 7 Gen 1"
  | "Snapdragon 6 Gen 1"
  | "MediaTek Dimensity 9000"
  | "MediaTek Dimensity 8000"
  | "MediaTek Dimensity 7000"
  | "Apple A16 Bionic"
  | "Apple A15 Bionic"
  | "Apple A14 Bionic"
  | "Exynos 2200"
  | "Exynos 2100"
  | "Google Tensor G2"
  | "Google Tensor G1"
  | "Kirin 9000"
  | "Snapdragon 888"
  | "Snapdragon 870"
  | "Snapdragon 865";

export interface ProductSpecs {
  screenType?: ScreenType;
  screenDiagonal?: ScreenDiagonal;
  batteryCapacity?: BatteryCapacity;
  builtInMemory?: BuiltInMemory;
  protectionClass?: ProtectionClass;
  cpu?: CpuType;
}

export interface Product {
  _id: string;

  title: string;
  description?: string;

  price: number;
  originalPrice?: number;

  type: ProductType;
  brand: ProductBrand;

  image: string | null;
  images: string[];

  specs?: ProductSpecs;

  discountPercentage: number;
  hasDiscount: boolean;
  isDiscountActive: boolean;

  discountStart?: string | null;
  discountEnd?: string | null;

  owner: string;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  message: string;
  count: number;
  products: Product[];
}

export interface CreateProductDto {
  title: string;
  description?: string;

  price: number;
  originalPrice?: number;

  type: ProductType;
  brand: ProductBrand;

  image?: string | null;
  images?: string[];

  specs?: ProductSpecs;

  discountPercentage?: number;
  hasDiscount?: boolean;
  isDiscountActive?: boolean;

  discountStart?: string | null;
  discountEnd?: string | null;
}

export interface UpdateProductDto
  extends Partial<CreateProductDto> {}

export interface ProductFilters {
  type?: ProductType;
  brand?: ProductBrand;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}