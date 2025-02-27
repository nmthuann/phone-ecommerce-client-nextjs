'use client'

import { useEffect, useState } from 'react'

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND'
})

interface CurrencyProps {
  value?: string | number
  className?: string
}

const Currency: React.FC<CurrencyProps> = ({ value = 0, className = '' }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  const formatCurrency = (num: number) => {
    // Convert large numbers to shortened form with 4 decimal places
    // if (num >= 1e9) {
    //   return `${(num / 1e9).toFixed(6)} tỷ đ` // Billions with 4 decimal places
    // }
    // if (num >= 1e6) {
    //   return `${(num / 1e6).toFixed(3)} triệu đ` // Millions with 4 decimal places
    // }

    // Default formatting for smaller numbers
    return formatter.format(num)
  }

  return <div className={`font-semibold text-2xl ${className}`}>{formatCurrency(Number(value))}</div>
}

export default Currency
