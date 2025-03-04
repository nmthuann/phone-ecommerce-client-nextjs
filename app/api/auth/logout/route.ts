import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const cookie = (await cookies()).get('access_token')?.value

    if (!cookie) {
      return new NextResponse('Unauthenticated', { status: 403 })
    }

    ;(await cookies()).delete('access_token')

    return NextResponse.json({
      message: 'Đăng xuất thành công.'
    })
  } catch (error) {
    console.log('[BRANDS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
