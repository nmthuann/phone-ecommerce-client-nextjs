'use server'
import { SystemError } from '@/constants/errors.enum'
import { Page } from '@/types/page.type'
import { ProductResponse } from '@/types/responses.type'

const path = `${process.env.NEXT_PUBLIC_API_URL}/products`
export async function getProducts(brandUrl: string, page: number, size: number): Promise<Page<ProductResponse>> {
  const URL = `${path}?brandUrl=/${brandUrl}&page=${page}&size=${size}`

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
    const products: Page<ProductResponse> = await res.json()
    return products
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error(SystemError.FETCH_DATA_ERROR)
  }
}
