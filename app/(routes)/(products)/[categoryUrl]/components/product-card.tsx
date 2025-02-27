import Currency from '@/components/utilities/currency'
import { ProductResponse, SkuResponse } from '@/types/products.type'
import { Button, Card, CardBody, CardFooter, Chip, Image } from '@heroui/react'
import { ShoppingBag } from 'lucide-react'
import { FC, useEffect, useState } from 'react'

type ProductCardProps = {
  product: ProductResponse
}
const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND'
})
export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const [selectedSku, setSelectedSku] = useState<SkuResponse>(product.skus[0]) // Chọn SKU đầu tiên mặc định
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const discountPercentage = selectedSku.displayPrice
    ? Math.round(((selectedSku.displayPrice - selectedSku.sellingPrice) / selectedSku.sellingPrice) * 100)
    : null
  return (
    <Card
      className='w-60 h-full cursor-pointer min-h-[400px] flex flex-col justify-between 
        shadow-xl hover:shadow-2xl transition-shadow duration-300 dark:bg-slate-900 rounded-2xl p-2'
      isBlurred
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

        <Chip radius='full' variant='faded' className='text-slate-500'>
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
              <p className='text-tiny text-teal-600'>
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
                  ? ' text-slate-950 border-2 border-red-600'
                  : 'text-slate-950 border-2 border-slate-400'
              }`}
              onClick={() => setSelectedSku(sku)}
            >
              {sku.skuAttributes.find(attr => attr.key === 'storage')?.value as string}
            </button>
          ))}
        </div>
      </CardBody>
      <CardFooter className='p-4'>
        <Button
          startContent={<ShoppingBag />}
          variant='shadow'
          className='w-full bg-gradient-to-r from-red-600 to-red-900 text-white'
        >
          Thêm vào giỏ hàng
        </Button>
      </CardFooter>
    </Card>
  )
}
