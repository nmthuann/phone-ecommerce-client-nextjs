'use client'

import { FAQ } from '@/types/ui.type'
import AccordionFAQ from './accordion-faq'
import References from '../../ve-chung-toi/components/references'
interface FaqInfoProps {
  data: FAQ[]
}

export default function FaqInfo({ data }: Readonly<FaqInfoProps>) {
  return (
    <div className='max-w-4xl mx-auto px-4 py-8'>
      <h1 className='text-center text-2xl sm:text-4xl font-bold m-6'>Câu Hỏi Thường Gặp</h1>

      <AccordionFAQ data={data} />
      <section className='m-6'>
        <h2 className='text-2xl font-semibold mb-4 '>Khám Phá Thêm</h2>
        <References />
      </section>
    </div>
  )
}
