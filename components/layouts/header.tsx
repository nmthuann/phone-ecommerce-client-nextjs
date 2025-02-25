'use client'
import { LucideShoppingBag, User2 } from 'lucide-react'
import Link from 'next/link'
import InsightRoll from './insight-roll'
import SearchBar from '../modules/search/search-bar'
import { Button } from '@heroui/react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const insights: string[] = [
  '1000+ Sản phẩm đa dạng 🛒',
  'Hơn 24 năm phục vụ khách hàng 🎉',
  'Khách hàng hài lòng 😊',
  'Giao hàng nhanh chóng 🚚',
  'Ưu đãi đặc biệt hàng tháng 🎁',
  'Hỗ trợ tận tâm 24/7 📞',
  'Nơi mua sắm tin cậy cho mọi gia đình 🏡'
]

const categories = [
  { label: 'Điện thoại', href: '/dien-thoai' },
  { label: 'Đồng hồ', href: '/dong-ho' },
  { label: 'Máy tính bảng', href: '/may-tinh-bang' },
  { label: 'Phụ kiện', href: '/phu-kien' }
]

export const Header: React.FC = () => {
  const pathname = usePathname()

  return (
    <header>
      <InsightRoll insights={insights} />

      {/* Header chính */}
      <div className='py-4 xl:py-6 max-w-7xl mx-auto px-4 lg:px-6'>
        <div className='flex items-center justify-between space-x-4'>
          {/* LOGO + SEARCH BAR */}
          <div className='flex items-center space-x-4 flex-1'>
            <Link href='/'>
              <h1 className='text-3xl md:text-4xl font-semibold dark:text-red-500 text-red-700'>
                MY PHONE <span className='dark:text-yellow-400 text-yellow-400'>.</span>
              </h1>
            </Link>
            <SearchBar />
          </div>

          {/* NÚT ĐĂNG NHẬP & GIỎ HÀNG */}
          <div className='flex space-x-4'>
            <Button startContent={<User2 />} variant='light'>
              Đăng nhập
            </Button>
            <Button startContent={<LucideShoppingBag />} variant='light'>
              Giỏ hàng
            </Button>
          </div>
        </div>

        {/* CATEGORIES NAVIGATION */}
        <nav className='mt-5 flex justify-center space-x-6'>
          {categories.map(category => (
            <Link
              key={category.href}
              href={category.href}
              className={cn(
                'text-base font-medium transition-colors hover:text-red-600',
                pathname === category.href ? 'text-red-600 font-bold' : 'text-neutral-500'
              )}
            >
              {category.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
