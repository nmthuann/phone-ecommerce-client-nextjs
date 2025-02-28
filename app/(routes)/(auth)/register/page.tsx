import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import imagePhone from '../../../../public/images/my-phone-store.png'
import { Divider } from '@heroui/react'
import Footer from '@/components/layouts/footer'
import { RegisterForm } from './components/register-form'
export const metadata: Metadata = {
  title: 'Đăng ký',
  description: 'Authentication forms built using the components.'
}
const RegisterPage = () => {
  return (
    <div>
      <div className='flex min-h-screen items-center justify-center mb-4 mt-4'>
        <div className='flex flex-col md:flex-row  shadow-xl rounded-lg overflow-hidden w-full max-w-4xl dark:border-2 dark:border-white'>
          {/* Hình ảnh bên trái */}
          <div className='hidden md:flex items-center justify-center w-1/2 bg-slate-200 dark:bg-slate-300'>
            <Image src={imagePhone} alt='Hình ảnh cửa hàng' width={400} height={300} className='object-contain' />
          </div>

          {/* Form đăng nhập bên phải */}
          <div className='w-full md:w-1/2 p-8 flex flex-col justify-center'>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
              <div className='text-center'>
                <h1 className='text-2xl font-bold'>Đăng Ký Tài Khoản</h1>
                <p className='text-sm text-slate-500'>Đăng ký ngay để nhận nhiều ưu đãi từ cửa hàng.</p>
              </div>

              <RegisterForm />

              <p className='text-center text-sm text-slate-500'>
                Bằng cách tiếp tục, bạn đồng ý với{' '}
                <Link href='/' className='underline hover:text-yellow-500'>
                  Điều khoản dịch vụ
                </Link>{' '}
                và{' '}
                <Link href='/' className='underline hover:text-yellow-500'>
                  Chính sách bảo mật
                </Link>
                .
              </p>
              <p className='text-center text-sm text-slate-600'>
                Bạn đã có tài khoản?{' '}
                <Link href='/login' className='text-yellow-500 hover:underline'>
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <Footer />
    </div>
  )
}

export default RegisterPage
