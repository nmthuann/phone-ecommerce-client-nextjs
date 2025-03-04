import { getLocation } from '@/actions/get-location'
import { getCart } from '@/actions/get-cart'
import OrderInformation from './components/order-information'
import CheckoutInformation from './components/checkout-information'
import { Divider } from '@heroui/react'
import Footer from '@/components/layouts/footer'

const PaymentPage = async () => {
  const location = await getLocation()
  const cart = await getCart()
  return (
    <div>
      <div
        className='flex flex-col md:flex-row h-auto mt-5 mb-5 ml-2 mr-2
              rounded-3xl border-none'
      >
        <OrderInformation data={cart} location={location} />
        <CheckoutInformation data={cart} />
      </div>
      <Divider />
      <Footer />
    </div>
  )
}

export default PaymentPage
