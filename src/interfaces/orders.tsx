export interface OrdersI {
  shippingAddress: ShippingAddressI
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: UserI
  cartItems: CartItemI[]
  paidAt: string
  createdAt: string
  updatedAt: string
  id: number
}

export interface ShippingAddressI {
  details: string
  phone: string
  city: string
}

export interface UserI {
  _id: string
  name: string
  email: string
  phone: string
}

export interface CartItemI {
  count: number
  _id: string
  product: ProductI
  price: number
}

export interface ProductI {
  subcategory: SubcategoryI[]
  ratingsQuantity: number
  _id: string
  title: string
  imageCover: string
  category: CategoryI
  brand: BrandI
  ratingsAverage: number
  id: string
}

export interface SubcategoryI {
  _id: string
  name: string
  slug: string
  category: string
}

export interface CategoryI {
  _id: string
  name: string
  slug: string
  image: string
}

export interface BrandI {
  _id: string
  name: string
  slug: string
  image: string
}
