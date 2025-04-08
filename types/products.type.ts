export type Attribute = {
  key: string
  value: string
}

export type Brand = {
  id: number
  brandName: string
  brandUrl: string
  description: string
  brandAbbreviation: string
}

export type Product = {
  id: number
  productName: string
  slug: string
  productLine: string
  description: string
  status: boolean
  productSpecs: Record<string, string>
}

export type ProductSku = {
  id: number
  skuNo: string
  barcode: string
  skuName: string
  image: string
  status: boolean
  skuAttributes: Record<string, string>
  slug: string
}

export type ProductWithBrand = Product & Brand
export type ProductWithBrandAndProductSku = Product & Brand & ProductSku

export type SearchProductResponse = {
  id: string
  productName: string
  slug: string
  brandUrl: string
}
