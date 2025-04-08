'use server'

import { SystemError } from '@/constants/errors.enum'
import { SearchProductResponse } from '@/types/products.type'

export async function searchSkusByName(content: string): Promise<SearchProductResponse[]> {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/products/search?q=${content}`

  try {
    const options = {
      method: 'GET',
      next: { revalidate: 0 }
    }
    const res = await fetch(URL, options)

    if (!res.ok) {
      console.error(`Error fetching data: ${res.statusText}`)
      throw new Error(SystemError.FETCH_DATA_ERROR)
    }

    const data: SearchProductResponse[] = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
