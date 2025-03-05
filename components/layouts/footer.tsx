'use client'

import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='mt-8'>
      <div className='w-full mb-5 flex justify-between items-center'>
        <div>
          <Link href='/' className='flex items-center'>
            <h1 className='text-3xl md:text-4xl font-semibold dark:text-red-500 text-red-700'>
              MY PHONE <span className='dark:text-yellow-400 text-yellow-400'>.</span>
            </h1>
          </Link>
        </div>
        <div>
          <ul className='flex items-center flex-wrap'>
            <li>
              <Link
                href='/'
                className='text-[16px] text-[#b1b0b6] font-Inter font-[500]
                                     hover:text-yellow-400 duration-200 transition px-4 text-sm sm:text-base md:text-lg'
              >
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                href='/chinh-sach'
                className='text-[16px] text-[#b1b0b6] font-Inter font-[500] 
                                hover:text-yellow-400 duration-200 transition px-4 text-sm sm:text-base md:text-lg'
              >
                Chính sách CSKH
              </Link>
            </li>
            <li>
              <Link
                href='/hoi-dap'
                className='text-[16px] text-[#b1b0b6] font-Inter font-[500] 
                                hover:text-yellow-400 duration-200 transition px-4 text-sm sm:text-base md:text-lg'
              >
                Hỏi Đáp
              </Link>
            </li>
            <li>
              <Link
                href='/ve-chung-toi'
                className='text-[16px] text-[#b1b0b6] font-Inter font-[500] 
                                hover:text-yellow-400 duration-200 transition px-4 text-sm sm:text-base md:text-lg'
              >
                Về chúng tôi
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className='text-[18px] font-[400] text-[#b1b0b6] font-Inter text-center text-xs sm:text-sm md:text-base'>
        {`Copyright © ${new Date().getFullYear()} My Phone . All Rights Reserved`}
      </p>
      <br />
      <br />
    </div>
  )
}

export default Footer
