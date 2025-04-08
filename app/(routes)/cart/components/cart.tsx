'use client'

import { BreadcrumbItem, Breadcrumbs, Divider } from '@heroui/react'
import useCart from '@/hooks/use-cart'
import CartSummary from './cart-summary'
import CartItem from './cart-item'
import CartEmpty from './cart-empty'

const Cart = () => {
  const cart = useCart()
  return (
    <div>
      <div className='px-4 py-10 sm:px-6 lg:px-8'>
        <h1 className='text-3xl font-bold'>{`Giỏ Hàng ( ${cart.items.length} )`}</h1>
      </div>
      <div className='ml-5'>
        <Breadcrumbs>
          <BreadcrumbItem>Trang chủ</BreadcrumbItem>
          <BreadcrumbItem>Giỏ hàng</BreadcrumbItem>
        </Breadcrumbs>
      </div>

      <div className='flex flex-col md:flex-row h-auto mt-5 mb-5 shadow rounded-3xl border ml-2 mr-2'>
        {/* Phần tử 1: Chiếm 2/3 */}
        <div className='flex-1 md:flex-[2] p-4 space-y-4 rounded-3xl '>
          <div className='lg:col-span-7 overflow-y-auto max-h-[500px]'>
            {cart.items.length === 0 && <CartEmpty />}
            <ul>
              {cart.items.map(item => (
                <CartItem key={item.id || 0} data={item} />
              ))}
              <Divider />
            </ul>
          </div>
        </div>

        {/* Phần tử 2: Chiếm 1/3 */}
        <div className='flex-1 md:flex-[1] shadow dark:shadow-slate-500/50 dark:shadow-md rounded-3xl p-4 h-[560px] border'>
          <CartSummary />
        </div>
      </div>
    </div>
  )
}

export default Cart
