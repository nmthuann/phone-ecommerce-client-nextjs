'use client'

import { usePathname } from 'next/navigation'
import { BreadcrumbItem, Breadcrumbs, Card, CardBody, Tab, Tabs } from '@heroui/react'
import { PackageCheck, RefreshCw, ShieldCheck, Truck } from 'lucide-react'
import { Brand, Category } from '@/types/products.type'
import SidebarFilter from './sidebar'

type CategoryComponentProps = {
  brands: Brand[]
  cats: Category[]
}

const CategoryExplorer: React.FC<CategoryComponentProps> = ({ brands, cats }) => {
  // const router = useRouter()
  const pathname = usePathname()

  const category = cats.find(cat => cat.categoryUrl === pathname)
  const items = [
    {
      title: category?.categoryName ?? '',
      path: category?.categoryUrl ?? ''
    }
  ]
  const home = { title: 'Trang chủ', path: '/' }
  const breadcrumbItems = [home, ...items]
  return (
    <div className='max-w-7xl mx-auto p-4'>
      {/* Breadcrumbs */}
      <div className='mb-4'>
        <Breadcrumbs>
          {breadcrumbItems.map(breadcrumb => (
            <BreadcrumbItem key={breadcrumb.path} href={breadcrumb.path} isCurrent={pathname === breadcrumb.path}>
              {breadcrumb.title}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      </div>

      {/* Tabs và nội dung */}
      <div className=' shadow-lg rounded-xl p-4 md:p-6'>
        <Tabs aria-label='Danh sách thương hiệu' items={brands} variant='underlined'>
          {brand => (
            <Tab key={brand.id} title={brand.brandName}>
              <Card className='mt-4'>
                <CardBody>
                  <h3 className='text-xl font-semibold'>{brand.brandName}</h3>
                  <p className='text-gray-600 mt-2'>{brand.description}</p>
                </CardBody>
              </Card>
            </Tab>
          )}
        </Tabs>
      </div>
      <div className='mt-10'>
        <SidebarFilter />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 mt-10'>
        {benefits.map(benefit => (
          <div
            key={benefit.title}
            className='flex flex-col items-center text-center p-6 border rounded-xl shadow-md  dark:border-white'
          >
            <benefit.icon className='w-12 h-12 text-red-500 mb-3' />
            <h3 className='text-lg font-semibold'>{benefit.title}</h3>
            <p className='text-gray-600 text-sm mt-1'>{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryExplorer

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Thương hiệu đảm bảo',
    description: 'Nhập khẩu, bảo hành chính hãng'
  },
  {
    icon: RefreshCw,
    title: 'Đổi trả dễ dàng',
    description: 'Theo chính sách đổi trả tại FPT Shop'
  },
  {
    icon: PackageCheck,
    title: 'Sản phẩm chất lượng',
    description: 'Đảm bảo tương thích và độ bền cao'
  },
  {
    icon: Truck,
    title: 'Giao hàng tận nơi',
    description: 'Tại 63 tỉnh thành'
  }
]
