'use client'
import Currency from '@/components/utilities/currency'
import { Divider, Image } from '@heroui/react'

interface OrderItemProps {
  image: string
  productName: string
  price: number
}

export const OrderItem: React.FC<OrderItemProps> = ({ image, productName, price }) => {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center m-2'>
        {/* Image */}
        <Image alt='Album cover' className='object-cover rounded-md' src={image} width={50} />

        {/* Product Information */}
        <div className='ml-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>{`${productName}`}</p>
          <p className='text-sm text-muted-foreground'>{`Số lượng: ${1}`}</p>
        </div>

        {/* Price */}
        <div className='ml-auto font-medium'>
          <Currency value={price} />
        </div>
      </div>

      {/* Divider */}
      <Divider className='my-2' />
    </div>
  )
}
