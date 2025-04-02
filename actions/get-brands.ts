import { SystemError } from '@/constants/errors.enum'
import { Brand } from '@/types/products.type'

export async function getBrands(): Promise<Brand[]> {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/brands`
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
    const data: Brand[] = await res.json()

    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error(SystemError.FETCH_DATA_ERROR)
  }
}
