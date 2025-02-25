'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation' // Import usePathname để lấy đường dẫn hiện tại
import { cn } from '@/lib/utils' // Hàm nối class (nếu có)

const categories = [
  { label: 'Điện thoại', href: '/dien-thoai' },
  { label: 'Đồng hồ', href: '/dong-ho' },
  { label: 'Máy tính bảng', href: '/may-tinh-bang' },
  { label: 'Phụ kiện', href: '/phu-kien' }
]

const CategoryNav: React.FC = () => {
  const pathname = usePathname() // Lấy URL hiện tại

  return (
    <nav className='mx-6 flex items-center space-x-4 lg:space-x-6 mt-5'>
      {categories.map(category => (
        <Link
          key={category.href}
          href={category.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-black',
            pathname === category.href ? 'text-black font-bold' : 'text-neutral-500'
          )}
        >
          {category.label}
        </Link>
      ))}
    </nav>
  )
}

export default CategoryNav
