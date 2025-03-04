'use client'
import { LucideShoppingBag, User2 } from 'lucide-react'
import Link from 'next/link'
import InsightRoll from './insight-roll'
import SearchBar from '../modules/search/search-bar'
import { Badge, Button } from '@heroui/react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'
import { useAuthContext } from '@/providers/auth-provider'
import UserAction from './user-action'
import { Cart } from '@/types/orders.type'

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

interface HeaderProps {
  cart: Cart
}

export const Header: React.FC<HeaderProps> = ({ cart }) => {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuthContext()

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
          <div className=''>
            {user ? (
              <div className='flex space-x-4'>
                <ThemeToggle />

                <Badge
                  content={cart.totalItems}
                  shape='circle'
                  color='danger'
                  className='dark:border-white border-slate-900'
                >
                  <Button
                    radius='full'
                    isIconOnly
                    aria-label='more than 99 notifications'
                    variant='light'
                    className='font-bold rounded-full dark:text-white text-slate-800 border-3 
                    dark:bg-slate-900 bg-white  dark:border-slate-400'
                    onPress={() => router.push('/cart')}
                  >
                    <LucideShoppingBag size={18} className='text-slate-800 dark:text-slate-400' />
                  </Button>
                </Badge>
                <UserAction user={user} />
              </div>
            ) : (
              <div className='flex space-x-4'>
                <Button
                  onPress={() => router.push('login')}
                  startContent={<User2 />}
                  variant='light'
                  className='text-slate-700 dark:text-slate-400'
                >
                  Đăng nhập
                </Button>
                <Button
                  startContent={<LucideShoppingBag />}
                  variant='light'
                  className='text-slate-700 dark:text-slate-400'
                >
                  Giỏ hàng
                </Button>
                <ThemeToggle />
              </div>
            )}
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
                pathname === category.href ? 'text-red-600 font-bold' : 'text-slate-700 dark:text-slate-400'
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
