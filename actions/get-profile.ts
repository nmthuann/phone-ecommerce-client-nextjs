'use server'

import { SystemError } from '@/constants/errors.enum'
import { User } from '@/types/users.type'
import { cookies } from 'next/headers'

export async function getUser(): Promise<User | null> {
  const cookie = (await cookies()).get('access_token')?.value
  console.log('cookie:::', cookie)
  if (!cookie) {
    return null
  }
  try {
    const URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/me`

    const response = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${cookie}`
      },
      cache: 'no-store'
    })

    if (!response.ok) {
      return null
    }

    const data: User = await response.json()

    return data
  } catch (error: unknown) {
    console.error('Error fetching data:', error)
    throw new Error(SystemError.FETCH_DATA_ERROR)
  }
}
