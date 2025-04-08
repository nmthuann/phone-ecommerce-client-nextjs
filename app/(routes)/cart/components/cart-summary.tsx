'use client'
import React, { useMemo, useState } from 'react'
import { PackageCheckIcon } from 'lucide-react'
import Currency from '@/components/utilities/currency'
import { Button } from '@heroui/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import LoadingOverlay from '@/components/loading-overlay'
import useCart from '@/hooks/use-cart'

const CartSummary = () => {
  const items = useCart(state => state.items)
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onConfirmOrder = () => {
    try {
      setLoading(true)
      router.push('/checkout')
    } catch (error: unknown) {
      console.log(error)
      setLoading(false)
      toast.error('Failed to confirm order.')
    } finally {
      setLoading(false)
    }
  }

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => total + Number(item.sellingPrice) * 1, 0)
  }, [items])

  return (
    <div className='mt-16 rounded-lg  px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 '>
      <h2 className='text-lg font-medium '>Giá trị đơn hàng</h2>
      <div className='mt-6 space-y-4'>
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium '>Tổng tiền</div>
          <Currency value={totalPrice} />
        </div>
      </div>

      <Button
        onPress={onConfirmOrder}
        isDisabled={items.length === 0 || loading}
        className='w-full mt-6 font-medium 
                  bg-gradient-to-r from-red-600 to-red-800 text-white'
        isLoading={loading}
        startContent={<PackageCheckIcon />}
        variant='shadow'
      >
        Xác nhận đơn hàng
      </Button>

      <LoadingOverlay loading={loading} />
    </div>
  )
}

export default CartSummary
