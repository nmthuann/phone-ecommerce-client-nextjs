import { SystemError } from '@/constants/errors.enum'
import { Category } from '@/types/products.type'

export async function getCategoryByUrl(categoryUrl: string): Promise<Category | null> {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/categories?categoryUrl=/${categoryUrl}`
  const options = {
    method: 'GET',
    next: { revalidate: 0 }
  }

  try {
    const res = await fetch(URL, options)

    if (res.status === 404) {
      console.warn(`Category not found: ${categoryUrl}`)
      return null // Trả về null thay vì ném lỗi
    }

    if (!res.ok) {
      console.error(`Error fetching data: ${res.statusText}`)
      throw new Error(SystemError.FETCH_DATA_ERROR)
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error(SystemError.FETCH_DATA_ERROR)
  }
}
