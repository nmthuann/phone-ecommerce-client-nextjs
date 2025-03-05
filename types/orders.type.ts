import { Attribute } from './products.type'

export type CartItem = {
  productSkuId: number
  skuName: string
  image: string
  quantity: number
  skuAttributes: Attribute[]
  priceAtAdded: number
  totalItemPrice: number
}

export type Cart = {
  userId: string
  items: CartItem[]
  totalItems: number
  totalPrice: number
}
