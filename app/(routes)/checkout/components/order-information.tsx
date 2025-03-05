'use client'

import { Cart, CartItem } from '@/types/orders.type'
import { Button, Card, CardBody, CardHeader, ScrollShadow, Textarea } from '@heroui/react'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { OrderItem } from './order-item'
import { useAuthContext } from '@/providers/auth-provider'
import { CustomerOrderForm } from './customer-order-form'
import { ShippingAddressForm } from './shipping-address-form'
import { City } from '@/types/location.type'
import PaymentMethodForm from './payment-method-form'

interface OrderInformationProps {
  data: Cart
  location: City[]
}

const OrderInformation: FC<OrderInformationProps> = ({ data, location }) => {
  const router = useRouter()
  const { user } = useAuthContext()

  return (
    <div
      className='flex-1 md:flex-[2] 
                bg-gray-50 dark:bg-slate-950 shadow p-4 space-y-4 rounded-3xl'
    >
      <div>
        <Button
          onPress={() => {
            router.back()
          }}
          color='default'
          variant='light'
          startContent={<ChevronLeft />}
        >
          Quay lại giỏ hàng
        </Button>
      </div>
      <div>
        <Card isBlurred className='border-none bg-background/60 dark:bg-default-100/50 max-w-full' shadow='sm'>
          <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
            <h4 className='font-bold text-large'>{`Sản phẩm trong đơn hàng (${data.totalItems})`}</h4>
            <small className='text-default-500'>{`Bạn đã chọn ${data.totalItems} sản phẩm để thanh toán`}</small>
          </CardHeader>
          <CardBody>
            <ScrollShadow className='w-full h-56'>
              <div className='space-y-4'>
                {data.items.map((item: CartItem) => (
                  <OrderItem
                    key={item.productSkuId}
                    image={item.image}
                    productName={item.skuName}
                    quantity={item.quantity}
                    price={item.priceAtAdded}
                  />
                ))}
              </div>
            </ScrollShadow>
          </CardBody>
        </Card>
      </div>
      <Card isBlurred className='border-none bg-background/60 dark:bg-default-100/50 max-w-full' shadow='sm'>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
          <h4 className='font-bold text-large'>Thông tin khách hàng</h4>
          <small className='text-default-500'>Hãy nhập thông tin của bạn để thuận tiện cho việc thanh toán.</small>
        </CardHeader>
        <CardBody>
          <CustomerOrderForm customer={user} />
        </CardBody>
      </Card>

      <div>
        <Card isBlurred className='border-none bg-background/60 dark:bg-default-100/50 max-w-full' shadow='sm'>
          <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
            <h4 className='font-bold text-large'>Hình thức nhận hàng</h4>
            <small className='text-default-500'>
              Vui lòng chọn địa chỉ giao hàng để giúp Shipper có thể tìm đến bạn.
            </small>
          </CardHeader>
          <CardBody>
            <ShippingAddressForm location={location} />
            <Textarea
              variant='faded'
              label='Ghi chú'
              description='Ghí chú (ví dụ: Hãy gọi tôi khi chuẩn bị hàng xong)'
              className='mt-3 w-full'
            />
          </CardBody>
        </Card>
      </div>

      <Card isBlurred className='border-none bg-background/60 dark:bg-default-100/50 max-w-full' shadow='sm'>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
          <h4 className='font-bold text-large'>Phương thức thanh toán</h4>
          <small className='text-default-500'>Hãy Chọn phương thức thanh toán phù hợp với nhu cầu của bạn.</small>
        </CardHeader>
        <CardBody>
          <PaymentMethodForm />
        </CardBody>
      </Card>
    </div>
  )
}

export default OrderInformation
