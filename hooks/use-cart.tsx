'use client'

import { create } from 'zustand'
import { toast } from 'react-hot-toast'
import { createJSONStorage, persist } from 'zustand/middleware'
import { SkuDetailResponse } from '@/types/responses.type'

/**
 * @description
 * Cart store using Zustand and localStorage for persistence.
 * Chỉ thêm một sản phẩm duy nhất vào giỏ hàng.
 * Đây là sản phẩm điện tử sẽ được quản lý bởi serial
 * 1. Việc chỉ thêm một sản phẩm duy nhất vào giỏ hàng sẽ giúp cho việc quản lý sản phẩm dễ dàng hơn.
 * 2. Tránh spam sản phẩm, hoặc mua nhiều sản phẩm để giữ lại bán với giá cao hơn.
 */
interface CartStore {
  items: SkuDetailResponse[]
  addItem: (newItem: SkuDetailResponse) => void
  removeItem: (id: number) => void
  removeAll: () => void
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (newItem: SkuDetailResponse) => {
        if (!newItem || typeof newItem.id !== 'number') {
          toast.error('Sản phẩm không phù hợp.')
          return
        }

        const currentItems = get().items
        const exists = currentItems.some(item => item.id === newItem.id)

        if (exists) {
          toast.error('Sản phẩm đã có trong giỏ hàng.')
          return
        }

        if (currentItems.length >= 5) {
          toast.error('Giỏ hàng đầy! Vui lòng thanh toán trước khi thêm.')
          return
        }

        set({ items: [...currentItems, newItem] })
        toast.success(`${newItem.skuName} đã được thêm vào giỏ hàng.`)
      },
      removeItem: (id: number) => {
        set({
          items: get().items.filter(item => item.id !== id)
        })
        toast.success('Đã xóa sản phẩm khỏi giỏ hàng.')
      },
      removeAll: () => set({ items: [] })
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useCart
