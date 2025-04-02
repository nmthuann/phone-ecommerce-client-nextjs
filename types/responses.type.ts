export type SkuResponse = {
  id: number
  skuName: string
  image: string
  slug: string
  skuAttributes: Record<string, string>
  sellingPrice: number
  displayPrice: number
}

export type ProductResponse = {
  id: number
  productName: string
  slug: string
  brandName: string
  brandUrl: string
  skus: SkuResponse[]
}

export type ProductDetailResponse = {
  id: number
  productName: string
  slug: string
  productLine: string
  description: string
  status: boolean
  productSpecs: Record<string, string>
  brandName: string
  sku: SkuDetailResponse[]
}

export type SkuDetailResponse = {
  id: number
  skuNo: string
  barcode: string
  skuName: string
  image: string
  status: boolean
  skuAttributes: Record<string, string>
  slug: string
  sellingPrice: number
  displayPrice: number
  stock: number
}
