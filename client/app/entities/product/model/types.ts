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

export interface ProductSpecs {
  screenType?: string;
  screenDiagonal?: string;
  batteryCapacity?: string;
  builtInMemory?: string;
  protectionClass?: string;
  cpu?: string;
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

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ProductsResponse {
  message: string;
  products: Product[];
  pagination: Pagination;
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

  hasDiscount?: boolean;

  screenType?: string;
  screenDiagonal?: string;
  batteryCapacity?: string;
  builtInMemory?: string;
  protectionClass?: string;
}