'use server'
import { SystemError } from '@/constants/errors.enum'
import { ProductDetailResponse } from '@/types/responses.type'

export async function getProductBySlug(slug: string): Promise<ProductDetailResponse> {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/products?slug=/${slug}`
  const options = {
    method: 'GET',
    next: { revalidate: 0 }
  }

  try {
    const res = await fetch(URL, options)

    if (!res.ok) {
      console.error(`Error fetching data: ${res.statusText}`)
      throw new Error(SystemError.FETCH_DATA_ERROR)
    }
    const data: ProductDetailResponse = await res.json()

    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error(SystemError.FETCH_DATA_ERROR)
  }
}
