'use client'

import { Button } from '@heroui/react'
import { SearchX, Undo } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NotFoundComponent() {
  const router = useRouter()
  return (
    <main className='min-h-screen w-full flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center text-center'>
        <SearchX size={100} className='text-slate-400' />
        <h2
          className='text-slate-400 text-2xl md:text-3xl font-bold xl:text-4xl mt-4 md:mt-6 
                    tracking-wide leading-relaxed'
        >
          Không tìm thấy sản phẩm bạn yêu cầu
        </h2>
        <p className='text-slate-500 text-sm mt-2'>Vui lòng quay về trang chủ hoặc thử tìm kiếm sản phẩm khác.</p>
        <Button
          color='success'
          variant='shadow'
          radius='md'
          size='lg'
          className='mt-8 px-6 py-3 font-semibold text-base
                   bg-gradient-to-r from-red-600 to-red-900 text-white
                    transition-all duration-300 ease-in-out'
          onPress={() => router.push('/')}
          startContent={<Undo className='w-5 h-5 mr-2' />}
        >
          Quay về trang chủ
        </Button>
      </div>
    </main>
  )
}
