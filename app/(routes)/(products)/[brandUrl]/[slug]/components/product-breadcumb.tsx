'use client'
import { Brand } from '@/types/products.type'
import { ProductDetailResponse } from '@/types/responses.type'
import { BreadcrumbItem, Breadcrumbs } from '@heroui/react'
import { usePathname } from 'next/navigation'

interface ProductBreadcumbProps {
  brand: Brand
  product: ProductDetailResponse
}

export const ProductBreadcumb: React.FC<ProductBreadcumbProps> = ({ brand, product }) => {
  const pathname = usePathname()
  const items = [
    {
      title: brand?.brandName ?? '',
      path: brand?.brandUrl ?? ''
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
