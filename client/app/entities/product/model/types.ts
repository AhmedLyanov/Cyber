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

  type: string;
  brand: string;

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