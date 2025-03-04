'use client'
import { useAuthContext } from '@/providers/auth-provider'
import { User } from '@/types/users.type'
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'

import axios from 'axios'
import { CircleHelp, Heart, LogOut, MapPin, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface UserActionProps {
  user: User
}

export const UserAction: React.FC<UserActionProps> = ({ user }) => {
  const { handleLogout } = useAuthContext()
  const router = useRouter()

  if (!user) {
    return null
  }

  async function handleOnClickLogout() {
    try {
      const res = await axios.post('/api/auth/logout')
      toast.success(res.data.message)
      handleLogout()
      router.push('/')
    } catch (error: unknown) {
      console.log('error:::', error)
      toast.error('Đăng xuất thất bại.')
    }
  }

  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'

  return (
    <Dropdown placement='bottom-end' className='bg-slate-50 dark:bg-slate-950'>
      <DropdownTrigger className=' p-1  transition-transform hover:scale-105'>
        <Avatar
          as='button'
          isBordered
          className=' transition-transform  w-9 h-9 text-tiny rounded-full border-2 shadow-md dark:bg-slate-900 bg-white dark:border-slate-400'
          src={user.avatarUrl}
          showFallback
        />
      </DropdownTrigger>
      <DropdownMenu aria-label='Profile Actions' variant='flat'>
        <DropdownItem key='introduce' className='h-14 gap-0'>
          <p className='font-semibold'>Chào, {user.firstName}</p>
        </DropdownItem>
        <DropdownItem key='accounts' href='/accounts'>
          Thông tin các nhân
        </DropdownItem>
        <DropdownItem key='order' href='/accounts/orders' startContent={<Package className={iconClasses} />}>
          Đơn hàng của tôi
        </DropdownItem>
        <DropdownItem key='address' href='/accounts/address' startContent={<MapPin className={iconClasses} />}>
          Địa chỉ giao hàng
        </DropdownItem>

        <DropdownItem key='member' href='/accounts/members' startContent={<Heart className={iconClasses} />}>
          Khách hàng thân thiết
        </DropdownItem>
        <DropdownItem key='help_and_feedback' href='/helps' startContent={<CircleHelp className={iconClasses} />}>
          phản hồi & trợ giúp
        </DropdownItem>
        <DropdownItem
          key='logout'
          color='danger'
          onPress={handleOnClickLogout}
          startContent={<LogOut className={iconClasses} />}
        >
          Đăng xuất
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserAction
