'use client'

import Image from 'next/image'
import { HandCoins } from 'lucide-react'
import { useState } from 'react'
import stripeLogo from '../../../../public/payments/images.png'
import { Checkbox, cn } from '@heroui/react'
const PaymentMethodForm = () => {
  const [selectedMethod, setSelectedMethod] = useState('')

  const handleCheckboxChange = (method: unknown) => {
    setSelectedMethod(method as string)
  }
  return (
    <div className='w-full space-y-2'>
      <Checkbox
        aria-label='payment-method'
        classNames={{
          base: cn(
            'inline-flex w-full max-w-full bg-content1',
            'hover:bg-content2 items-center justify-start',
            'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
            'data-[selected=true]:border-primary'
          ),
          label: 'w-full'
        }}
        isSelected={selectedMethod === 'cash'}
        onValueChange={() => handleCheckboxChange('cash')}
      >
        <div className='w-full flex justify-start items-center gap-2'>
          <HandCoins size={32} />
          <span className='text-base font-medium text-default-500'>Thanh toán khi nhận hàng</span>
        </div>
      </Checkbox>
      <Checkbox
        aria-label='payment-method-stripe'
        classNames={{
          base: cn(
            'inline-flex w-full max-w-full bg-content1',
            'hover:bg-content2 items-center justify-start',
            'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
            'data-[selected=true]:border-primary'
          ),
          label: 'w-full'
        }}
        isSelected={selectedMethod === 'stripe'}
        onValueChange={() => handleCheckboxChange('stripe')}
      >
        <div className='w-full flex justify-start items-center gap-2'>
          <Image src={stripeLogo} width={32} height={32} alt='stripe-logo' className=' ' />
          <span className='text-base font-medium text-default-500'>
            Thanh toán online qua cổng thanh toán quốc tế Stripe
          </span>
        </div>
      </Checkbox>
    </div>
  )
}

export default PaymentMethodForm
