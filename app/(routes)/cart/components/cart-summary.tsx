'use client'
import React, { FC, useState } from 'react'
import { PackageCheckIcon } from 'lucide-react'
import Currency from '@/components/utilities/currency'
import { Button } from '@heroui/react'
import { Cart } from '@/types/orders.type'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface CartSummaryProps {
  data: Cart
}

const CartSummary: FC<CartSummaryProps> = ({ data }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const onConfirmOrder = () => {
    setLoading(true) // Start loading
    try {
      router.push('/checkout')
    } catch (error: unknown) {
      console.log(error)
      toast.error('Failed to confirm order.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mt-16 rounded-lg  px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 '>
      <h2 className='text-lg font-medium '>Giá trị đơn hàng</h2>
      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium '>Tổng tiền</div>
          <Currency value={data.totalPrice} />
        </div>
      </div>
      {loading ? (
        <Button
          isLoading
          color='secondary'
          spinner={
            <svg
              className='animate-spin h-5 w-5 text-current'
              fill='none'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
              <path
                className='opacity-75'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                fill='currentColor'
              />
            </svg>
          }
        >
          Loading
        </Button>
      ) : (
        <Button
          onPress={onConfirmOrder}
          isDisabled={data.totalItems === 0}
          className='w-full mt-6 font-medium
                  bg-gradient-to-r from-red-600 to-red-900 text-white'
          isLoading={loading}
          startContent={<PackageCheckIcon />}
          variant='shadow'
        >
          Xác nhận đơn hàng
        </Button>
      )}
    </div>
  )
}

export default CartSummary
