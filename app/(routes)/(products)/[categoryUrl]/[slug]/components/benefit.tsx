import React from 'react'

interface Benefit {
  icon: React.ElementType
  title: string
  description: string
}

const Benefit = ({ benefits }: { benefits: Benefit[] }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 mt-10'>
      {benefits.map(benefit => (
        <div
          key={benefit.title}
          className='flex flex-col items-center text-center p-6 border rounded-xl shadow-md  dark:border-white'
        >
          {React.createElement(benefit.icon, { className: 'w-12 h-12 text-red-500 mb-3' })} {/* Sửa lỗi render icon */}
          <h3 className='text-lg font-semibold'>{benefit.title}</h3>
          <p className='text-gray-600 text-sm mt-1'>{benefit.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Benefit
