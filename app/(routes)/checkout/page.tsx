import { getLocation } from '@/actions/get-location'
// import { getCart } from '@/actions/get-cart'
// import OrderInformation from './components/order-information'
// import CheckoutInformation from './components/checkout-information'
import { Divider } from '@heroui/react'
import Footer from '@/components/layouts/footer'
import Checkout from './components/checkout'

const PaymentPage = async () => {
  const location = await getLocation()
  return (
    <div>
      <Checkout location={location} />
      <Divider />
      <Footer />
    </div>
  )
}

export default PaymentPage
