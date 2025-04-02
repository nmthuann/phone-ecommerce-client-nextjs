import { NextResponse } from 'next/server'
import axios from 'axios'
import { User } from '@/types/users.type'
import { cookies } from 'next/headers'
import { RegisterResponse } from '@/types/auth.response.type'
import { RoleEnum } from '@/constants/role-enum'
import { AuthMethodEnum } from '@/constants/auth-method.enum'
import { AuthExceptionMessages } from '@/constants/errors.enum'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, phone, firstName, lastName, address } = body
    if (!email) {
      return new NextResponse('Email is required', { status: 400 })
    }
    if (!password) {
      return new NextResponse('Password is required', { status: 400 })
    }
    if (!phone) {
      return new NextResponse('Phone number is required', { status: 400 })
    }
    if (!firstName) {
      return new NextResponse('First name is required', { status: 400 })
    }
    if (!lastName) {
      return new NextResponse('Last name is required', { status: 400 })
    }
    if (!address) {
      return new NextResponse('Address is required', { status: 400 })
    }

    const authMethodId = AuthMethodEnum.LOCAL_AUTHENTICATION
    const roleId = RoleEnum.USER

    const URL: string = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`

    const res = await axios.post(
      URL,
      {
        email,
        password,
        phone,
        firstName,
        lastName,
        address,
        authMethodId,
        roleId
      },
      {
        headers: {
          'X-Rest-Api-Version': `${process.env.NEXT_PUBLIC_BACKEND_VERSION_API}`
        }
      }
    )
    const data: RegisterResponse = res.data
    const user: User = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      avatarUrl: data.avatarUrl,
      phone: data.address
      // TODO: check here
    }
    const oneDay = 24 * 60 * 60 * 1000 // 1 day in milliseconds
    const cookieExpiration = new Date(Date.now() + oneDay)
    ;(await cookies()).set({
      name: 'access_token',
      value: data.accessToken,
      expires: cookieExpiration
    })
    return NextResponse.json(user)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500
      if (status === 400 && error.response?.data.message === AuthExceptionMessages.EMAIL_EXSIT) {
        return NextResponse.json({ message: `${AuthExceptionMessages.EMAIL_EXSIT}` }, { status: 200 })
      } else {
        return NextResponse.json({ message: `${AuthExceptionMessages.REGISTER_USER_FAILED}` }, { status: 200 })
      }
    } else {
      return new NextResponse(`Unknown error occurred: ${error}`, { status: 500 })
    }
  }
}
