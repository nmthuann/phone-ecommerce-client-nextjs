'use client'

import { Button } from '@heroui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const UserRegiter = () => {
  const router = useRouter()
  return (
    <div className='w-full 2xl:w-[80%] 2xl:m-auto h-[30vh] flex items-center justify-center sellers-banner rounded-xl md:m-2'>
      <div className='text-center'>
        <h1
          className='text-xl md:text-2xl lg:text-3xl xl:text-4xl 
        font-bold  text-center sm:text-left'
        >
          Các sản phẩm mới với nhiều ưu đãi đang chờ đón bạn!
        </h1>
        <br />
        <br />
        <Button
          variant='shadow'
          radius='lg'
          onPress={() => router.push('/apple')}
          className='
                    mb-3 p-6 text-lg
                    bg-gradient-to-r from-red-600 to-red-800
                    text-white font-semibold font-Inter'
        >
          <span>Xem ngay</span>
        </Button>
      </div>
    </div>
  )
}

export default UserRegiter
