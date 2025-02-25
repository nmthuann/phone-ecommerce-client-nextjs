'use client'
import { Button } from '@heroui/react'
import { SearchX, Undo } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NotFoundComponent() {
  const router = useRouter()
  return (
    <main className='min-h-screen w-full flex flex-col items-center justify-center '>
      <div className='flex flex-col items-center text-center'>
        <SearchX size={100} className='text-slate-400' />
        <h2
          className='text-slate-400 text-2xl md:text-3xl font-bold xl:text-4xl mt-4 md:mt-6 
                    tracking-wide leading-relaxed'
        >
          Không tìm thấy trang yêu cầu
        </h2>
        <p className='text-slate-500 text-sm mt-2'>
          Có thể bạn chưa đăng nhập hoặc vui lòng đăng xuất và đăng nhập lại. Xin cảm ơn.
        </p>
        <Button
          color='success'
          variant='shadow'
          radius='md'
          size='lg'
          className='mt-8 px-6 py-3 text-white font-semibold text-lg
                    bg-gradient-to-r from-lime-400 to-green-600
                    hover:from-lime-500 hover:to-green-700
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
