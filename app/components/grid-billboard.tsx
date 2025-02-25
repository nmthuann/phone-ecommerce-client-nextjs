'use client'
import React from 'react'
import { Card, CardBody } from '@heroui/react'
import { HandCoins, Handshake, ThumbsUp, TicketPercent, Truck } from 'lucide-react'

const GridBillboard: React.FC = () => {
  const sections = [
    {
      icon: HandCoins,
      title: 'Đa dạng mẫu mã',
      description: 'Discover our top-selling products.'
    },
    {
      icon: Truck,
      title: 'Giao Hàng Nhanh Chóng',
      description: 'Fast and reliable delivery.'
    },
    {
      icon: Handshake,
      title: 'Tận Tình',
      description: 'service is here to help you 24/7.'
    },
    {
      icon: TicketPercent,
      title: 'Ưu Đãi Đặc Biệt',
      description: 'Enjoy deals and discounts.'
    },
    {
      icon: ThumbsUp,
      title: 'Chất Lượng Đảm Bảo',
      description: 'We ensure the highest quality.'
    }
  ]

  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-10'>
      {sections.map(section => {
        const Icon = section.icon
        return (
          <div key={section.title}>
            <Card className='h-32 w-full shadow-xl border-2 dark:shadow-md dark:border-slate-200 dark:bg-slate-950'>
              <CardBody className='flex flex-col justify-center items-center'>
                <Icon className=' mb-2 ' size={45} />
                <div className='text-center '>
                  <h3 className='text-base font-bold'>{section.title}</h3>
                  <p className='text-xs '>{section.description}</p>
                </div>
              </CardBody>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export default GridBillboard
