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

export type SkuAttribute = {
  key: string
  value: unknown
}

export type SkuResponse = {
  id: number
  skuName: string
  image: string
  slug: string
  skuAttributes: SkuAttribute[]
  sellingPrice: number
  displayPrice: number
}

export type ProductResponse = {
  id: number
  productName: string
  slug: string
  categoryName: string
  categoryUrl: string
  brandName: string
  brandUrl: string
  skus: SkuResponse[]
}
