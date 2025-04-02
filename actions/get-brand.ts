import { SystemError } from '@/constants/errors.enum'
import { Brand } from '@/types/products.type'

export async function getBrandByUrl(brandUrl: string): Promise<Brand | null> {
  const URL = `http://localhost:3000/api/brands?brandUrl=/${brandUrl}`

  // const URL = `${process.env.NEXT_PUBLIC_API_URL}/brands?brandUrl=/${brandUrl}`
  console.log('🚀 Fetching:', URL)

  const options = {
    method: 'GET',
    next: { revalidate: 0 }
  }

  try {
    const res = await fetch(URL, options)

    if (res.status === 404) {
      console.warn(`Brand not found: ${brandUrl}`)
      return null // Trả về null thay vì ném lỗi
    }

    if (!res.ok) {
      console.error(`Error fetching data: ${await res.json()}`)
      throw new Error(SystemError.FETCH_DATA_ERROR)
    }

    return await res.json()
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error(SystemError.FETCH_DATA_ERROR)
  }
}
