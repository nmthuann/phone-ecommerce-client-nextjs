'use client'

import { Button } from '@heroui/react'
import { CircleArrowLeft, RotateCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ErrorComponentProps {
  title: string
  message: string
}

export const ErrorComponent: React.FC<ErrorComponentProps> = ({ title, message }) => {
  const router = useRouter()
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-5 '>
      <h1 className='text-4xl font-bold mb-6 '>{title}</h1>
      <p className='text-lg text-red-600 mb-8'>{message}</p>
      <div className='flex space-x-4'>
        <Button
          onPress={() => router.back()}
          variant='bordered'
          className='flex items-center justify-center px-4 py-2 
                      font-semibold
                    transition-all duration-300 ease-in-out'
        >
          <CircleArrowLeft className='h-5 w-5' />
          Quay về trang trước
        </Button>
        <Button
          onPress={() => router.refresh()}
          className='flex items-center justify-center px-4 py-2 
                    text-white font-semibold 
                    bg-gradient-to-r from-lime-400 to-green-600
                    hover:from-lime-500 hover:to-green-700
                     transition-all duration-300 ease-in-out'
        >
          <RotateCcw className='h-5 w-5' />
          Tải lại trang
        </Button>
      </div>
    </div>
  )
}
