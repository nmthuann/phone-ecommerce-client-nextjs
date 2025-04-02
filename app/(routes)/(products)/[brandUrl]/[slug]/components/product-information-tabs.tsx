'use client'

import React from 'react'
// import { SpuSkuMappingDto } from '@/types/products.type'
import { Divider, Tab, Tabs } from '@heroui/react'
import ProductSpecsTable from './product-specs-table'
import LoadingOverlay from '@/components/loading-overlay'
import { ProductDetailResponse } from '@/types/responses.type'
import { convertJsonToAttributes } from '@/utils/convert'

const tabs = [
  {
    title: 'Thông Số Kỹ Thuật'
  },

  {
    title: 'Mô tả'
  }
]

interface ProductInfomationTabsProps {
  data: ProductDetailResponse
}

const ProductInformationTabs: React.FC<ProductInfomationTabsProps> = ({ data }) => {
  if (!data) {
    return <LoadingOverlay loading={true} text='Please wait...' />
  }
  return (
    <div className='flex w-full flex-col  p-3 rounded-md'>
      <Tabs items={tabs} color='primary' variant='underlined'>
        {item => (
          <Tab key={item.title} title={item.title} className='text-base'>
            <Divider />
            <div className='py-2'>
              {item.title === 'Thông Số Kỹ Thuật' && (
                <ProductSpecsTable productSpecs={convertJsonToAttributes(data.productSpecs)} />
              )}
              {item.title === 'Mô tả' && (
                <p className='text-[18px] font-[400] text-[#b1b0b6] font-Inter whitespace-pre-line w-full overflow-hidden'>
                  {data.description ?? 'Sản phẩm không có mô tả'}
                </p>
              )}
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
  )
}

export default ProductInformationTabs
