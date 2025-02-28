'use client'
import { Category, SpuSkuMappingDto } from '@/types/products.type'
import { BreadcrumbItem, Breadcrumbs } from '@heroui/react'
import { usePathname } from 'next/navigation'

interface ProductBreadcumbProps {
  category: Category
  // items: { title: string; path: string }[]
  // currentPath: string
  product: SpuSkuMappingDto
}

export const ProductBreadcumb: React.FC<ProductBreadcumbProps> = ({ category, product }) => {
  const pathname = usePathname()
  const items = [
    {
      title: category?.categoryName ?? '',
      path: category?.categoryUrl ?? ''
    },
    {
      title: product.productName,
      path: product.slug
    }
  ]
  const home = { title: 'Trang chủ', path: '/' }
  const breadcrumbItems = [home, ...items]
  return (
    <Breadcrumbs>
      {breadcrumbItems.map(breadcrumb => (
        <BreadcrumbItem key={breadcrumb.path} href={breadcrumb.path} isCurrent={pathname === breadcrumb.path}>
          {breadcrumb.title}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  )
}
