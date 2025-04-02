import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const cookie = (await cookies()).get('access_token')?.value

    if (!cookie) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }
    const cookieStore = await cookies()
    cookieStore.delete('access_token')
    cookieStore.delete('user')
    return NextResponse.json({
      message: 'Đăng xuất thành công.'
    })
  } catch (error) {
    console.log('[LOGOUT_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
