'use client'
import Currency from '@/components/utilities/currency'
import { ProductSkuDto } from '@/types/products.type'
import { Checkbox, Chip, cn, User } from '@heroui/react'

interface SkuOptionCheckboxProps {
  option: ProductSkuDto
  isSelected: boolean
  onOptionChange: () => void
}

export const SkuOptionCheckbox: React.FC<SkuOptionCheckboxProps> = ({ option, isSelected, onOptionChange }) => {
  const displayPrice = option.displayPrice
  const sellingPrice = option.sellingPrice
  const discountPercentage = displayPrice ? Math.round(((displayPrice - sellingPrice) / displayPrice) * 100) : null

  return (
    <div>
      <Checkbox
        aria-label='option-1'
        classNames={{
          base: cn(
            'inline-flex max-w-full w-full  bg-content1',
            'hover:bg-content2 items-center justify-start',
            'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
            'data-[selected=true]:border-primary mb-3'
          ),
          label: 'w-full'
        }}
        isSelected={isSelected}
        onValueChange={onOptionChange}
      >
        <div className='w-full '>
          <User
            avatarProps={{
              size: 'lg',
              src: option.image
            }}
            description={`Số lượng: ${option.stock}`}
            name={`Mua với đơn vị cái`}
          />
          <div className='flex flex-col items-end gap-1 justify-center '>
            <Currency value={sellingPrice.toString()} />

            {displayPrice > sellingPrice && (
              <div className='flex flex-row justify-between items-center gap-x-4'>
                <span className='text-tiny text-default-400 line-through'>
                  <Currency value={displayPrice.toString()} />
                </span>

                <Chip color='danger' size='sm' variant='flat'>
                  -{discountPercentage}%
                </Chip>
              </div>
            )}
          </div>
          {/* SKU attributes */}
          <div className='mt-4 flex flex-wrap gap-2 md:gap-4'>
            {option.skuAttributes.map(attr => (
              <Chip
                key={attr.key}
                variant='shadow'
                size='sm'
                classNames={{
                  base: 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30',
                  content: 'drop-shadow shadow-black text-white font-medium'
                }}
              >
                {`${attr.key} ${attr.value}`}
              </Chip>
            ))}
          </div>
        </div>
      </Checkbox>
    </div>
  )
}
