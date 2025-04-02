'use client'

import { usePathname, useRouter } from 'next/navigation'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  // Card,
  // CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
  // Tab,
  // Tabs
} from '@heroui/react'
import {
  // ChevronDown,
  ChevronDownIcon,
  KanbanSquareDashed,
  PackageCheck,
  RefreshCw,
  ShieldCheck,
  Truck,
  Undo
} from 'lucide-react'
import { Brand } from '@/types/products.type'
import SidebarFilter from './sidebar'
import { ProductCard } from './product-card'
import { useMemo, useState } from 'react'
import LoadingOverlay from '@/components/loading-overlay'
import { ProductResponse } from '@/types/responses.type'

type CategoryComponentProps = {
  brand: Brand
  products: ProductResponse[]
}

const CategoryExplorer: React.FC<CategoryComponentProps> = ({ brand, products }) => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(['Sản phẩm bán chạy']))

  const selectedValue = useMemo(() => Array.from(selectedKeys).join(', ').replaceAll('_', ' '), [selectedKeys])

  const router = useRouter()
  const pathname = usePathname()

  const items = [
    {
      title: brand.brandName ?? '',
      path: brand.brandUrl ?? ''
    }
  ]
  const home = { title: 'Trang chủ', path: '/' }
  const breadcrumbItems = [home, ...items]

  if (!brand || !products) {
    return <LoadingOverlay loading={true} text='Please wait...' />
  }
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

      {/* Tabs và nội dung
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
      </div> */}

      {/* BỘ LỌC + CARD SẢN PHẨM  */}
      <div className='mt-10 flex flex-row items-start justify-center gap-6'>
        <div className='hidden md:block w-64'>
          <SidebarFilter />
        </div>

        <div className='flex-1 ml-4'>
          {/* Lọc theo hãng */}
          {/* <div className='m-2 flex flex-row items-center gap-3'>
            <p className='text-sm font-medium text-slate-500'>Lọc nhanh:</p>
            <Dropdown>
              <DropdownTrigger>
                <Button variant='bordered' className='px-4 py-2' endContent={<ChevronDown />}>
                  Hãng sản xuất
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label='Chọn hãng sản xuất' items={brands}>
                {brand => <DropdownItem key={brand.brandAbbreviation}>{brand.brandName}</DropdownItem>}
              </DropdownMenu>
            </Dropdown>
          </div> */}

          {/* Số lượng + hiển thị theo tiêu chí */}
          <div className='flex flex-row items-center justify-between'>
            <p className='ml-2 text-sm font-medium'>
              Tìm thấy <span className='font-bold text-red-600'>{products.length}</span> kết quả
            </p>
            <Dropdown>
              <DropdownTrigger>
                <Button variant='bordered' className='capitalize px-4 py-2 flex items-center gap-2'>
                  {selectedValue}
                  <ChevronDownIcon className='w-5 h-5' />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label='Desktop Menu'
                variant='flat'
                disallowEmptySelection
                selectionMode='single'
                selectedKeys={selectedKeys}
                onSelectionChange={keys => setSelectedKeys(new Set(keys as unknown as string[]))}
              >
                <DropdownItem key='Sản phẩm bán chạy'>🔥 Sản phẩm bán chạy</DropdownItem>
                <DropdownItem key='Giá thấp đến cao'>⬇ Giá thấp đến cao</DropdownItem>
                <DropdownItem key='Giá cao đến thấp'>⬆ Giá cao đến thấp</DropdownItem>
                <DropdownItem key='Khuyến mãi sốc'>🎉 Khuyến mãi sốc</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* hiển thị danh sách sản phẩm */}
          {products.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {products.map((product: ProductResponse) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center w-full py-20 text-center'>
              <KanbanSquareDashed className='text-gray-500 w-16 h-16 mb-4' />
              <p className='text-lg text-gray-600'>Hiện tại không không tìm thấy sản phẩm nào phù hợp.</p>
              <Button
                size='lg'
                className='mt-6 font-semibold text-base bg-gradient-to-r from-red-600 to-red-900 text-white'
                onPress={() => router.push('/')}
                endContent={<Undo />}
                aria-label='Quay lại trang chủ'
              >
                Quay lại trang chủ
              </Button>
            </div>
          )}
        </div>
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
