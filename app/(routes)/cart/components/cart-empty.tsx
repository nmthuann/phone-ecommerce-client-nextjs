'use client'
import { Button } from '@heroui/react'
import { KanbanSquareDashed, Undo } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CartEmpty = () => {
  const router = useRouter()
  return (
    <div className='col-span-full text-center flex flex-col items-center justify-center py-20'>
      <KanbanSquareDashed className='text-gray-500 w-16 h-16 mb-4' />
      <p className='text-lg text-gray-600'>Hiện tại không có sản phẩm nào trong giỏ hàng.</p>
      <Button
        color='warning'
        size='lg'
        className='mt-6 font-semibold text-base text-slate-100'
        onPress={() => router.push('/')}
        endContent={<Undo />}
      >
        Quay lại trang chủ
      </Button>
    </div>
  )
}

export default CartEmpty
