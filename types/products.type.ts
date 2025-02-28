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

export type Attribute = {
  key: string
  value: unknown
}

export type SpuSkuMappingDto = {
  id: number
  productName: string
  slug: string
  productLine: string
  description: string
  status: boolean
  productSpecs: Attribute[]
  brandName: string

  sku: ProductSkuDto[]
}

export type ProductSkuDto = {
  id: number
  skuNo: string
  barcode: string
  skuName: string
  image: string
  status: boolean
  skuAttributes: Attribute[]
  slug: string
  sellingPrice: number
  displayPrice: number
  stock: number
}
