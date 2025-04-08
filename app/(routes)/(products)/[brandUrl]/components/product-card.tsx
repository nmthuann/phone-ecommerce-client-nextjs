'use client'
import LoadingOverlay from '@/components/loading-overlay'
import Currency from '@/components/utilities/currency'
import { ProductResponse, SkuResponse } from '@/types/responses.type'
import { convertJsonToAttributes } from '@/utils/convert'
import { Button, Card, CardBody, CardFooter, Chip, Image } from '@heroui/react'
import { ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

type ProductCardProps = {
  product: ProductResponse
}
const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND'
})
export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const router = useRouter()
  const [selectedSku, setSelectedSku] = useState<SkuResponse>(product.skus[0]) // Chọn SKU đầu tiên mặc định
  const [loading, setLoading] = useState<boolean>(false)

  const discountPercentage = selectedSku.displayPrice
    ? Math.round(((selectedSku.displayPrice - selectedSku.sellingPrice) / selectedSku.sellingPrice) * 100)
    : null
  return (
    <div>
      <Card
        key={selectedSku.id}
        // isPressable
        aria-label='Choose Card'
        className='w-60 h-full cursor-pointer min-h-[400px] flex flex-col justify-between 
        shadow-xl hover:shadow-2xl transition-shadow duration-300 
        dark:bg-slate-950 dark:border-slate-400 dark:border-1 rounded-2xl p-2'
        isBlurred

        // onPress={() => router.push(`${product.categoryUrl}/${product.slug}`)}
      >
        <CardBody className='overflow-visible flex flex-col gap-4 p-4'>
          <Image
            isZoomed
            radius='none'
            width='100%'
            alt={selectedSku.skuName}
            shadow='sm'
            className=' h-[140px] w-full object-cover'
            src={selectedSku.image}
            loading='lazy'
          />

          <Chip radius='full' variant='faded' className='text-slate-500 dark:text-white'>
            Trả góp 0%
          </Chip>

          {/* Price */}
          <div className='flex flex-col items-start'>
            <Currency className='text-lg' value={selectedSku.sellingPrice.toString()} />
            {selectedSku.displayPrice > selectedSku.sellingPrice && (
              <div className='space-y-1'>
                <div className='flex items-center gap-2'>
                  <Currency
                    value={selectedSku.displayPrice.toString()}
                    className='text-sm text-default-400 line-through'
                  />
                  <p className='text-sm font-semibold text-red-600'>-{discountPercentage}%</p>
                </div>
                <p className='text-tiny text-cyan-500'>
                  Giảm {formatter.format(selectedSku.displayPrice - selectedSku.sellingPrice)}
                </p>
              </div>
            )}
          </div>

          <h1 className='text-left text-base font-normal break-words whitespace-normal line-clamp-2 '>
            {selectedSku.skuName}
          </h1>

          {/* Thuộc tính SKU */}
          <div className=' flex space-x-2'>
            {product.skus.map(sku => (
              <button
                key={sku.id}
                className={`px-3 py-1 border rounded ${
                  selectedSku.id === sku.id
                    ? ' text-slate-950 border-2 border-red-600 dark:text-white'
                    : 'text-slate-950 border-2 border-slate-400 dark:text-white'
                }`}
                onClick={() => setSelectedSku(sku)}
              >
                {convertJsonToAttributes(sku.skuAttributes).find(attr => attr.key === 'storage')?.value}
              </button>
            ))}
          </div>
        </CardBody>
        <CardFooter className='p-4'>
          <Button
            disabled={loading}
            startContent={<ShoppingBag className='w-5 h-5' />}
            onPress={() => {
              setLoading(true)
              router.push(`${product.brandUrl}/${product.slug}`)
            }}
            variant='shadow'
            className='w-full bg-gradient-to-r from-red-600 to-red-900 text-white'
          >
            Xem chi tiết
          </Button>
        </CardFooter>
      </Card>
      <LoadingOverlay loading={loading} />
    </div>
  )
}
