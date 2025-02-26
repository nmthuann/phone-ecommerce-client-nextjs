'use server'
import { SystemError } from '@/constants/errors.enum'
import { Category } from '@/types/products.type'

export async function getCategories(): Promise<Category[]> {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories`
  const options = {
    method: 'GET',
    next: { revalidate: 300 }
  }

  try {
    const res = await fetch(URL, options)

    if (!res.ok) {
      console.error(`Error fetching data: ${res.statusText}`)
      throw new Error(SystemError.FETCH_DATA_ERROR)
    }
    const data: Category[] = await res.json()

    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error(SystemError.FETCH_DATA_ERROR)
  }
}
