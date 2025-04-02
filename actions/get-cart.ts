// 'use server'

// import { Cart } from '@/types/orders.type'
// import { cookies } from 'next/headers'

// export async function getCart(): Promise<Cart> {
//   const cookie = (await cookies()).get('access_token')?.value

//   if (!cookie) {
//     return { userId: '', items: [], totalItems: 0, totalPrice: 0 }
//   }

//   const URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/carts`

//   const response = await fetch(URL, {
//     headers: {
//       Authorization: `Bearer ${cookie}`
//     }
//   })

//   if (!response.ok) {
//     return { userId: '', items: [], totalItems: 0, totalPrice: 0 }
//   }
//   return await response.json()
// }
