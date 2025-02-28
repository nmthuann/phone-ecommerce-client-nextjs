'use server'
import { SystemError } from '@/constants/errors.enum'
import { OrderBy } from '@/constants/order-by.enum'
import { ProductResponse } from '@/types/products.type'
import { Page } from '@/types/responses/paginated-response.type'

const path = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`
export async function getProducts(
  categoryUrl: string,
  brandUrl: string,
  page: number,
  size: number
): Promise<ProductResponse[]> {
  const URL = `${path}?categoryUrl=/${categoryUrl}&brandUrl=/${brandUrl}&order=${OrderBy.DESC}&page=${page}&take=${size}`

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
    const paginatedResponse: Page<ProductResponse> = await res.json()
    console.log(paginatedResponse.data)
    return paginatedResponse.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error(SystemError.FETCH_DATA_ERROR)
  }
}
