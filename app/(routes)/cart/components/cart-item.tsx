'use client'
import { toast } from 'react-hot-toast'
import { MinusCircleIcon, PlusCircleIcon, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button, Chip, Image } from '@heroui/react'
import Currency from '@/components/utilities/currency'
import { SkuDetailResponse } from '@/types/responses.type'
import { convertJsonToAttributes } from '@/utils/convert'
import useCart from '@/hooks/use-cart'

interface CartItemProps {
  data: SkuDetailResponse
  currentQuantity: number
}

const CartItem: React.FC<CartItemProps> = ({ data, currentQuantity }) => {
  const cart = useCart()
  const [quantityInCart, setQuantityInCart] = useState(currentQuantity)
  const onRemove = () => {
    // console.log('Handle On Remove')
    cart.removeItem(data.id)
  }

  const increaseQuantity = () => {
    const newQuantity = quantityInCart + 1

    if (newQuantity > 5) {
      toast.error(`Số lượng tối đa có thể mua là 5.`)
      return
    }

    if (newQuantity > data.stock) {
      toast.error(`Số lượng tồn kho chỉ còn ${data.stock}.`)
      return
    }

    setQuantityInCart(newQuantity)
    cart.updateQuantity(data.id, newQuantity)
    toast.success(`Tăng số lượng thành công.`)
  }

  const decreaseQuantity = () => {
    if (quantityInCart > 1) {
      const newQuantity = quantityInCart - 1
      setQuantityInCart(newQuantity)
      cart.updateQuantity(data.id, newQuantity)
      toast.success(`Giảm số lượng thành công.`)
    } else {
      toast.error(`Số lượng tối thiểu là 1.`)
    }
  }

  return (
    <li className='flex flex-col sm:flex-row py-6 border-bborder-gray-200 p-4'>
      {/* Product Image */}
      <div className='h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0 '>
        <Image
          alt={data.skuName}
          isBlurred
          width={100}
          src={data.image}
          isZoomed
          className='p-2 object-cover object-center '
        />
      </div>

      {/* Product Details */}
      <div className='flex flex-col sm:flex-row justify-between w-full sm:ml-6'>
        <div className='flex flex-col justify-between sm:pr-4'>
          <div>
            <h2 className='text-lg font-semibold '>{`${data.skuName}`}</h2>
            <div className='flex flex-col sm:flex-row text-sm text-gray-500 mt-1'>
              <p> {`Số lượng mua: ${quantityInCart}`}</p>

              <p className='sm:ml-4 sm:border-l sm:border-gray-200 sm:pl-4'>{`Đơn vị mua: Chiếc.`}</p>
            </div>
            <div className='mt-4 flex flex-wrap gap-2 md:gap-4'>
              {convertJsonToAttributes(data.skuAttributes).map(attr => (
                <Chip
                  key={attr.key}
                  variant='shadow'
                  size='sm'
                  classNames={{
                    base: 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30',
                    content: 'drop-shadow shadow-black text-white font-medium'
                  }}
                >
                  {`${attr.key} ${attr.value}`}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        {/* Price, Quantity, and Remove */}
        <div className='flex flex-col justify-between mt-4 sm:mt-0'>
          <div className='flex items-center justify-between sm:justify-start sm:space-x-4'>
            <Currency value={data.sellingPrice} />

            <div className='flex items-center gap-x-2'>
              <Button size='sm' isIconOnly radius='full' onPress={decreaseQuantity}>
                <MinusCircleIcon />
              </Button>
              <div>{quantityInCart}</div>
              <Button size='sm' isIconOnly radius='full' onPress={increaseQuantity}>
                <PlusCircleIcon />
              </Button>
            </div>
            <Button size='md' isIconOnly color='danger' className='ml-2' onPress={onRemove}>
              <Trash2 size={20} />
            </Button>
          </div>
        </div>
      </div>
    </li>
  )
}

export default CartItem
