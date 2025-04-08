import axios from 'axios'
import { NextResponse } from 'next/server'

const URL: string = `${process.env.NEXT_PUBLIC_API_URL}/checkout`
export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { firstName, lastName, email, contactPhone, shippingAddress, paymentMethod, shippingMethod, note, cart } =
      body

    if (!firstName) {
      return new NextResponse('firstName', { status: 400 })
    }

    if (!lastName) {
      return new NextResponse('lastName', { status: 400 })
    }

    if (!email) {
      return new NextResponse('email is missing', { status: 400 })
    }

    if (!contactPhone) {
      return new NextResponse('contactPhone is missing', { status: 400 })
    }

    if (!shippingAddress) {
      return new NextResponse('shippingAddress is missing', { status: 400 })
    }

    if (!paymentMethod) {
      return new NextResponse('paymentMethod is missing', { status: 400 })
    }

    if (!shippingMethod) {
      return new NextResponse('shippingMethod is missing', { status: 400 })
    }

    if (!cart) {
      return new NextResponse('cart is missing', { status: 400 })
    }

    const res = await axios.post(URL, {
      firstName,
      lastName,
      email,
      contactPhone,
      shippingAddress,
      paymentMethod,
      shippingMethod,
      note: note,
      cart
    })

    return NextResponse.json(res.data)
  } catch (error) {
    console.log('[CHECKOUT_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
