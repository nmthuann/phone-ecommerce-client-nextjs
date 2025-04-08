'use client'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { CircleHelp, Heart, PackageSearch, Store, User2 } from 'lucide-react'

export const UserAction = () => {
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'

  return (
    <Dropdown placement='bottom-end' className='bg-slate-50 dark:bg-slate-950'>
      <DropdownTrigger className=' p-1  transition-transform hover:scale-105'>
        <Button
          isIconOnly
          aria-label='user'
          variant='light'
          className='font-bold rounded-full dark:text-white text-slate-800 border-3 
                    dark:bg-slate-900 bg-white  dark:border-slate-400'
          radius='full'
        >
          <User2 />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Profile Actions' variant='flat'>
        <DropdownItem key='introduce' className='h-14 gap-0'>
          <p className='font-semibold'>Chào Bạn</p>
        </DropdownItem>
        <DropdownItem key='order' href='/tra-cuu-don-hang' startContent={<PackageSearch className={iconClasses} />}>
          Tra cứu đơn hàng
        </DropdownItem>
        <DropdownItem key='member' href='/chinh-sach' startContent={<Heart className={iconClasses} />}>
          Chính sách ưu đãi
        </DropdownItem>
        <DropdownItem key='help_and_feedback' href='/hoi-dap' startContent={<CircleHelp className={iconClasses} />}>
          phản hồi & trợ giúp
        </DropdownItem>
        <DropdownItem key='about' href='/ve-chung-toi' startContent={<Store className={iconClasses} />}>
          Về chúng tôi
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserAction
