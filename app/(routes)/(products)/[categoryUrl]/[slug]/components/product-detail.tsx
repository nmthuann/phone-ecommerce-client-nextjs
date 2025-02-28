'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { ProductSkuDto, SpuSkuMappingDto } from '@/types/products.type'
import { Button, Chip, useDisclosure } from '@heroui/react'
import { SkuOptionCheckbox } from './sku-option-checkbox'
import ConfirmQuantityModal from './confirm-quantity-modal'

interface ProductDetailProps {
  product: SpuSkuMappingDto
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedOption, setSelectedOption] = useState<ProductSkuDto>(product.sku[0])
  const [quantity, setQuantity] = useState(1)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const handleOptionChange = (option: ProductSkuDto) => {
    setSelectedOption(option)
    setQuantity(1)
  }

  return (
    <div className='p-5 opacity-100'>
      <h1 className='!text-2xl font-bold text-slate-800 dark:text-slate-100'>{selectedOption.skuName}</h1>
      <br />
      <div className='w-full flex items-center my-2 justify-between'>
        <Chip startContent={<CheckCircle size={18} />} variant='bordered' color='success' size='lg'>
          <span className='text-base font-Inter font-[500] font-Monserrat'>{product.brandName}</span>
        </Chip>
      </div>
      <br />
      <p className='text-[18px] font-[400] text-[#b1b0b6] font-Inter'>{product.description}</p>
      <br />
      <div className='w-full'>
        <span className='text-[16px]  font-Inter font-[500] !text-2xl pl-2 font-Monserrat'>Đơn vị mua hàng:</span>
        <br />
        <div className='w-full mt-4'>
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
          className='w-full  font-Inte  text-white
                    bg-gradient-to-r from-lime-400  to-green-600
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
        />
      </div>
    </div>
  )
}

export default ProductDetail
