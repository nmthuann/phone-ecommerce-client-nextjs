export type SkuCard = {
  newPrice: number
  oldPrice?: number
  sold: number
  rating: number
  images: string[]
  variants: Record<string, unknown>
}

export type ProductCard = {
  name: string
  slug: string
  skus: SkuCard[]
}

export type Brand = {
  id: number
  brandName: string
  brandUrl: string
  description?: string
  brandAbbreviation: string
}

export type Category = {
  id: number
  categoryName: string
  categoryUrl: string
  description?: string
}
