import Container from '@/components/layouts/container'
import Billboard from '@/app/components/billboard'
import GridBillboard from './components/grid-billboard'
import { Divider } from '@heroui/react'
import Footer from '@/components/layouts/footer'
import UserRegiter from './components/user-register'
import News from './components/news'

export default function Home() {
  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard />
        <GridBillboard />
        {/* <div className='p-20 flex flex-col items-center justify-center'>
          <h1 className=' text-4xl font-bold mb-4 text-red-600'>Flash Sale</h1>
        </div> */}
        <News />
        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 bg-slate-500'></div>
      </div>
      {/* Grid quảng cáo & tin tức */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 px-6'>
        {/* Cột quảng cáo sản phẩm */}
        <div className='md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-slate-950 text-white p-4 rounded-lg shadow-md text-center'>
            🎁 Mua 1 tặng 1 - Chỉ có hôm nay!
          </div>
          <div className='bg-slate-950 text-white p-4 rounded-lg shadow-md text-center'>
            ⚡ Xiaomi 14 Ultra chính thức lên kệ!
          </div>
          <div className='bg-slate-950 text-white p-4 rounded-lg shadow-md text-center'>
            🚀 Đặt trước Oppo Find X7 - Nhận quà khủng!
          </div>
          <div className='bg-slate-950 text-white p-4 rounded-lg shadow-md text-center'>
            🎉 Mua Samsung nhận voucher 2 triệu!
          </div>
        </div>

        {/* Cột tin tức công nghệ */}
        <div className='bg-white p-4 rounded-lg shadow-md'>
          <h2 className='text-lg font-bold mb-2'>📌 Tin tức mới nhất</h2>
          <ul className='space-y-2'>
            <li>📱 So sánh iPhone 15 Pro vs. Galaxy S24 Ultra</li>
            <li>💡 Những tính năng ẩn trên Android 14</li>
            <li>🛠️ Hướng dẫn chọn điện thoại pin trâu 2025</li>
            <li>🔥 5 flagship đáng mua nhất năm nay</li>
          </ul>
        </div>
      </div>
      <UserRegiter />
      <Divider />
      <Footer />
    </Container>
  )
}
