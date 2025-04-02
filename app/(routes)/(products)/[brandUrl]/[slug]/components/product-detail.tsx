'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { Button, Chip, useDisclosure } from '@heroui/react'
import { SkuOptionCheckbox } from './sku-option-checkbox'
import ConfirmQuantityModal from './confirm-quantity-modal'
// import { User } from '@/types/users.type'
import { ProductDetailResponse, SkuDetailResponse } from '@/types/responses.type'

interface ProductDetailProps {
  product: ProductDetailResponse
  // user: User | null
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedOption, setSelectedOption] = useState<SkuDetailResponse>(product.sku[0])
  const [quantity, setQuantity] = useState(1)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const handleOptionChange = (option: SkuDetailResponse) => {
    setSelectedOption(option)
    setQuantity(1)
  }

  return (
    <div className='p-5 opacity-100 shadow-lg rounded-2xl'>
      <h1 className='!text-2xl font-bold text-slate-800 dark:text-slate-100'>{selectedOption.skuName}</h1>
      <div className='flex space-x-4'>
        <p className='text-tiny text-cyan-500'>{selectedOption.skuNo}</p>
        <p className='text-tiny text-cyan-500'>{selectedOption.barcode}</p>
      </div>

      <br />
      <div className='w-full flex items-center justify-between'>
        <Chip
          startContent={<CheckCircle size={18} className='text-white' />}
          variant='shadow'
          className='bg-gradient-to-r from-red-600 to-red-800'
          size='lg'
        >
          <span className='text-base text-white'>{product.brandName}</span>
        </Chip>
      </div>
      <br />
      <p className='text-slate-700 dark:text-slate-200'>{product.description}</p>
      <br />
      <div className='w-full'>
        <span className='text-base'>Lựa chọn máy phù hợp:</span>
        <br />
        <div className='w-full mt-4 space-y-4'>
          {product.sku.map(option => (
            <SkuOptionCheckbox
              key={option.id}
              option={option}
              isSelected={selectedOption === option}
              onOptionChange={() => handleOptionChange(option)}
            />
          ))}
        </div>
        <br />
        <Button
          radius='full'
          size='lg'
          className='w-full bg-gradient-to-r from-red-600 to-red-900 text-white
          font-medium duration-300 transition-opacity'
          onPress={onOpen}
          isDisabled={product.sku.length == 0}
        >
          Xác nhận số lượng
        </Button>
        <ConfirmQuantityModal
          skuDetailSelected={selectedOption}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          quantity={quantity}
          setQuantity={setQuantity}
          // user={user}
        />
      </div>
    </div>
  )
}

export default ProductDetail
