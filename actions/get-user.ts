'use server'

import { User } from '@/types/users.type'
import { cookies } from 'next/headers'

export async function getUser(): Promise<User> {
  const cookie = (await cookies()).get('access_token')?.value

  if (!cookie) {
    return {
      email: '',
      firstName: '',
      lastName: '',
      avatarUrl: ''
    }
  }

  const URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/me`

  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${cookie}`
    },
    cache: 'no-store'
  })

  if (!response.ok) {
    return {
      email: '',
      firstName: '',
      lastName: '',
      avatarUrl: ''
    }
  }
  return await response.json()
}
