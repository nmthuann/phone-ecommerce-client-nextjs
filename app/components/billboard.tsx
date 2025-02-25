'use client'
import Image from 'next/image'
import React from 'react'
import image1 from '../../public/billboard/KQNGJTvFqkGEkibbeNOE_Apple-iPhone-16-Pro-Max_TomorrowsIndia.jpg'

const Billboard = () => {
  return (
    <div className='w-full max-w-full h-96 mx-auto relative'>
      <Image src={image1} alt='billboard' width={1920} height={500} className='w-full h-full object-cover' priority />
    </div>
  )
}

export default Billboard
