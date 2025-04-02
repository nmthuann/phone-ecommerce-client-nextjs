'use client'

import { JSX, SVGProps, useState } from 'react'
import { Filter, RotateCcw } from 'lucide-react'
import {
  Button,
  Checkbox,
  Slider,
  CheckboxGroup,
  Chip,
  VisuallyHidden,
  tv,
  useCheckbox,
  CheckboxProps,
  Tooltip
} from '@heroui/react'

// Dữ liệu danh mục lọc
const rams = ['4GB', '6GB', '8GB', '12GB', '16GB']
const storages = ['64GB', '128GB', '256GB', '512GB', '1TB']
const priceRanges = ['Dưới 5 triệu', '5 - 10 triệu', '10 - 20 triệu', 'Trên 20 triệu']
const screenRatios = ['16:9', '18:9', '19.5:9', '20:9']
const batteryCapacities = ['3000mAh', '4000mAh', '5000mAh', '6000mAh', '7000mAh']

interface CustomCheckboxProps extends CheckboxProps {
  children?: React.ReactNode
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = props => {
  const checkbox = tv({
    slots: {
      base: 'border-slate-500 hover:bg-red-100 dark:hover:bg-red-900',
      content: 'text-slate-950 dark:text-white'
    },
    variants: {
      isSelected: {
        true: {
          base: 'border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700',
          content: 'text-white pl-1'
        }
      },
      isFocusVisible: {
        true: {
          base: 'outline-none ring-2 ring-red-400 ring-offset-2 ring-offset-background'
        }
      }
    }
  })

  const { children, isSelected, isFocusVisible, getBaseProps, getLabelProps, getInputProps } = useCheckbox({ ...props })
  const styles = checkbox({ isSelected, isFocusVisible })

  return (
    <label {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <Chip
        classNames={{
          base: styles.base(),
          content: styles.content()
        }}
        color='primary'
        startContent={isSelected ? <CheckIcon className='ml-1 text-white' /> : null}
        variant='faded'
        {...getLabelProps()}
      >
        {children}
      </Chip>
    </label>
  )
}

// Icon dấu tick
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden='true'
    fill='none'
    focusable='false'
    height='1em'
    stroke='currentColor'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeWidth={2}
    viewBox='0 0 24 24'
    width='1em'
    {...props}
  >
    <polyline points='20 6 9 17 4 12' />
  </svg>
)

// Sidebar bộ lọc
const SidebarFilter = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([2000000, 30000000])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [selectedScreenRatios, setSelectedScreenRatios] = useState<string[]>([])
  const [selectedStorages, setSelectedStorages] = useState<string[]>([])
  const [selectedRAMs, setSelectedRAMs] = useState<string[]>([])
  const [selectedBatteryCapacities, setSelectedBatteryCapacities] = useState<string[]>([])

  const resetFilters = () => {
    setPriceRange([2000000, 30000000])
    setSelectedPriceRanges([])
    setSelectedScreenRatios([])
    setSelectedStorages([])
    setSelectedRAMs([])
    setSelectedBatteryCapacities([])
  }

  return (
    <div className='w-72 dark:border-2 dark:border-white shadow-lg rounded-lg p-4'>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-lg font-semibold flex items-center'>
          <Filter className='w-5 h-5 mr-2' /> Bộ lọc sản phẩm
        </h2>
        <Button size='sm' variant='ghost' onPress={resetFilters} isIconOnly>
          <RotateCcw className='w-4 h-4' />
        </Button>
      </div>
      {/* Mức giá */}
      <div className='mb-6'>
        <h3 className='text-sm font-semibold mb-2'>Mức giá</h3>
        <CheckboxGroup value={selectedPriceRanges} onValueChange={setSelectedPriceRanges} orientation='vertical'>
          {priceRanges.map(price => (
            <Checkbox key={price} value={price}>
              {price}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
      {/* Khoảng giá */}

      <div className='w-full flex flex-col items-start space-y-2'>
        {/* Label + Tooltip */}
        <label className='text-medium flex gap-2 items-center'>
          Khoảng giá
          <Tooltip
            className='w-[220px] px-1.5 text-tiny text-default-600 rounded-small'
            content='Chọn khoảng giá mong muốn để lọc sản phẩm.'
            placement='right'
          >
            <span className='transition-opacity opacity-80 hover:opacity-100'>
              <InfoIcon />
            </span>
          </Tooltip>
        </label>

        {/* Slider */}
        <Slider
          classNames={{
            base: 'max-w-md gap-3',
            filler: 'bg-gradient-to-r from-red-400 to-red-700 dark:from-red-500 dark:to-red-900'
          }}
          value={priceRange}
          minValue={2000000}
          maxValue={30000000}
          step={500000}
          onChange={value => setPriceRange(value as [number, number])}
          size='lg'
          renderThumb={({ index, ...props }) => (
            <div
              {...props}
              className='group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing'
            >
              <span
                className={`transition-transform bg-gradient-to-br shadow-small rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80 ${
                  index === 0
                    ? 'from-red-300 to-red-600 dark:from-red-400 dark:to-red-700' // thumb trái
                    : 'from-orange-300 to-orange-600 dark:from-orange-500 dark:to-orange-800' // thumb phải
                }`}
              />
            </div>
          )}
        />

        {/* Hiển thị giá */}
        <p className='text-default-500 font-medium text-small'>
          Khoảng giá: {priceRange[0].toLocaleString()}₫ - {priceRange[1].toLocaleString()}₫
        </p>
      </div>

      {/* Dung lượng ROM */}
      <div className='mb-6'>
        <h3 className='text-sm font-semibold mb-2'>Dung lượng ROM</h3>
        <CheckboxGroup value={selectedStorages} onValueChange={setSelectedStorages} orientation='horizontal'>
          {storages.map(storage => (
            <CustomCheckbox key={storage} value={storage}>
              {storage}
            </CustomCheckbox>
          ))}
        </CheckboxGroup>
      </div>

      {/* Tỷ lệ màn hình */}
      <div className='mb-6'>
        <h3 className='text-sm font-semibold mb-2'>Tỷ lệ màn hình</h3>
        <CheckboxGroup value={selectedScreenRatios} onValueChange={setSelectedScreenRatios} orientation='vertical'>
          {screenRatios.map(ratio => (
            <Checkbox key={ratio} value={ratio}>
              {ratio}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>

      {/* Dung lượng RAM */}
      <div className='mb-6'>
        <h3 className='text-sm font-semibold mb-2'>Dung lượng RAM</h3>
        <CheckboxGroup value={selectedRAMs} onValueChange={setSelectedRAMs} orientation='horizontal'>
          {rams.map(ram => (
            <CustomCheckbox key={ram} value={ram}>
              {ram}
            </CustomCheckbox>
          ))}
        </CheckboxGroup>
      </div>

      {/* Dung lượng PIN */}
      <div className='mb-6'>
        <h3 className='text-sm font-semibold mb-2'>Dung lượng PIN</h3>
        <CheckboxGroup
          value={selectedBatteryCapacities}
          onValueChange={setSelectedBatteryCapacities}
          orientation='vertical'
        >
          {batteryCapacities.map(capacity => (
            <Checkbox key={capacity} value={capacity}>
              {capacity}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>

      {/* Button áp dụng */}
      <Button className='w-full mb-3 p-6 text-lg bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold font-Inter'>
        Áp dụng bộ lọc
      </Button>
    </div>
  )
}

export default SidebarFilter

// Icon Thông tin
export const InfoIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden='true'
    fill='none'
    focusable='false'
    height='1em'
    role='presentation'
    viewBox='0 0 24 24'
    width='1em'
    {...props}
  >
    <path
      d='M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
    />
    <path d='M12 8V13' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' />
    <path d='M11.9945 16H12.0035' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
  </svg>
)
