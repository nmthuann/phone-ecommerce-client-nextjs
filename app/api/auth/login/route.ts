'use server'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import axios from 'axios'
import { User } from '@/types/users.type'
import { AuthExceptionMessages, ErrorInput } from '@/constants/errors.enum'
import { LoginResponse } from '@/types/auth.response.type'

const URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email) {
      return new NextResponse(ErrorInput.FIELD_MISSING, { status: 400 })
    }
    if (!password) {
      return new NextResponse(ErrorInput.FIELD_MISSING, { status: 400 })
    }

    const res = await axios.post(URL, { email, password })
    const data: LoginResponse = res.data
    const user: User = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      avatarUrl: data.avatarUrl,
      phone: data.phone
    }
    const FIFTEEN_MINUTES = 15 * 60 * 1000
    const cookieExpiration = new Date(Date.now() + FIFTEEN_MINUTES)
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'access_token',
      value: data.accessToken,
      expires: cookieExpiration,
      httpOnly: true,
      path: '/'
    })
    return NextResponse.json(user)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500
      if (status === 404) {
        return NextResponse.json({ message: `${AuthExceptionMessages.LOGIN_INVAILD}` }, { status: 200 })
      } else if (status === 401) {
        return NextResponse.json({ message: `${AuthExceptionMessages.PASSWORD_WRONG}` }, { status: 200 })
      } else {
        return NextResponse.json({ message: `${AuthExceptionMessages.LOGIN_FAILED}` }, { status: 200 })
      }
    } else {
      return new NextResponse(`Unknown error occurred: ${error}`, { status: 500 })
    }
  }
}
