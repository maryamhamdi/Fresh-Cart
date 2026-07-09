// Cart Response Types

export interface CartSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface CartCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CartBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CartProductDetails {
  subcategory: CartSubcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: CartCategory;
  brand: CartBrand;
  ratingsAverage: number;
  id: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: CartProductDetails;
  price: number;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
  totalCartPriceAfterDiscount?: number;
}

export interface UserCartResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface ApplyCouponResponse {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}