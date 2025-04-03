'use client'
import { create } from 'zustand'
import { toast } from 'react-hot-toast'
import { createJSONStorage, persist } from 'zustand/middleware'
import { SkuDetailResponse } from '@/types/responses.type'

interface CartStore {
  items: { sku: SkuDetailResponse; cartQuantity: number }[]
  addItem: (newItem: SkuDetailResponse, quantity: number) => void
  removeItem: (id: number) => void
  removeAll: () => void
  updateQuantity: (id: number, newQuantity: number) => void
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (newItem: SkuDetailResponse, quantity: number) => {
        // item không phù hợp
        if (!newItem || typeof newItem.id !== 'number') {
          toast.error('Sản phẩm không phù hợp.')
        }
        // cart đầy
        if (get().items.length >= 5) {
          toast.error('Giỏ hàng đầy!. Vui lòng thanh toán trước khi thêm.')
        }

        const currentCart = get().items
        const existItemIndex = currentCart.findIndex(item => item.sku.id === newItem.id)

        // Item already in cart, increment cartQuantity
        if (existItemIndex !== -1) {
          set(state => {
            const updateCart = [...state.items]
            updateCart[existItemIndex].cartQuantity += quantity
            return { items: updateCart }
          })
        }
        // Item not in cart, add to items array with cartQuantity of 1
        else {
          set(state => {
            return {
              items: [
                ...state.items,
                {
                  sku: newItem,
                  cartQuantity: quantity
                }
              ]
            }
          })
        }
        toast.success(`${newItem.skuName} đã được thêm vào giỏ hàng`)
      },
      removeItem: (id: number) => {
        set({
          items: [...get().items.filter(item => item.sku.id !== id)]
        })
        toast.success('Đã xóa sản phẩm ra khỏi giỏ hàng.')
      },
      removeAll: () => set({ items: [] }),
      updateQuantity: (id: number, newQuantity: number) => {
        set(state => {
          const updateItems = state.items.map(item => {
            if (item.sku.id === id) {
              return { ...item, cartQuantity: newQuantity }
            }
            return item
          })
          return { items: updateItems }
        })
      }
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
export default useCart
