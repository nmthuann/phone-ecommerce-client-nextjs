// import axios from 'axios'
// import { cookies } from 'next/headers'
// import { NextResponse } from 'next/server'

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const { productSkuId, quantity } = body
//     const cookie = (await cookies()).get('access_token')?.value

//     if (!cookie) {
//       return new NextResponse('Unauthenticated', { status: 403 })
//     }

//     if (!productSkuId) {
//       return new NextResponse('Product Sku Id is required', { status: 400 })
//     }

//     if (!quantity) {
//       return new NextResponse('Quantity is required', { status: 400 })
//     }

//     const URL: string = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`

//     const res = await axios.post(
//       URL,
//       {
//         productSkuId,
//         quantity
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${cookie}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     )

//     return NextResponse.json({
//       message: 'Add to cart successfully',
//       data: res.data
//     })
//   } catch (error) {
//     console.log('[CART_ADD]', error)
//     return new NextResponse('Internal error', { status: 500 })
//   }
// }
