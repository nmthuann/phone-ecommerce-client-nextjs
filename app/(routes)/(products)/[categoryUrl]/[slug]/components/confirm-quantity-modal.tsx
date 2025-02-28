'use client'
import Currency from '@/components/utilities/currency'
import { ProductSkuDto } from '@/types/products.type'
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface ConfirmQuantityModalProps {
  skuDetailSelected: ProductSkuDto
  isOpen: boolean
  onOpenChange(): void
  quantity: number
  setQuantity(quantity: number): void
}

const ConfirmQuantityModal: React.FC<ConfirmQuantityModalProps> = ({
  skuDetailSelected,
  isOpen,
  onOpenChange,
  quantity,
  setQuantity
}) => {
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    if (skuDetailSelected) {
      setTotalPrice(skuDetailSelected.sellingPrice * quantity)
    }
  }, [quantity, skuDetailSelected])

  const onAddToCart = async () => {
    if (quantity > skuDetailSelected?.stock) {
      toast.error('Bạn đã thêm quá số lượng hiện có ở cửa hàng.')
    } else {
      toast.success('Bạn đã thêm thành công.')
    }
  }

  const increaseQuantity = () => {
    if (skuDetailSelected && quantity < skuDetailSelected.stock) {
      setQuantity(quantity + 1)
    } else {
      toast.error('Bạn không thể thêm quá số lượng hiện có.')
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      placement='center'
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className='flex flex-col  text-xl font-bold'>Xác nhận số lượng</ModalHeader>
            <ModalBody className='m-4'>
              <div>
                <h3 className='font-semibold '>Tên Sản phẩm</h3>
                <h3>{skuDetailSelected.skuName}</h3>
                <div className='mt-4 flex flex-wrap gap-2 md:gap-4'>
                  {skuDetailSelected.skuAttributes.map(skuAttr => (
                    <Chip
                      key={skuAttr.key}
                      variant='shadow'
                      size='sm'
                      classNames={{
                        base: 'bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30',
                        content: 'drop-shadow shadow-black text-white font-medium'
                      }}
                    >
                      {`${skuAttr.key} ${skuAttr.value}`}
                    </Chip>
                  ))}
                </div>
              </div>

              <hr className='my-4' />
              <div className='mt-3 flex items-center justify-between'>
                <h3 className='font-semibold '>Đơn giá:</h3>
                <Currency value={skuDetailSelected?.sellingPrice} />
              </div>
              <hr className='my-4' />
              <div className='flex flex-col '>
                <div className='flex items-center justify-between gap-x-4'>
                  <h3 className='font-semibold '>Đơn vị mua hàng:</h3>
                  <div>{'cái'}</div>
                </div>
              </div>
              <hr className='my-4' />
              <div className='flex flex-col '>
                <div className='flex items-center justify-between gap-x-4'>
                  <h3 className='font-semibold '>Số lượng tồn kho:</h3>
                  <div>{skuDetailSelected?.stock}</div>
                </div>
              </div>
              <hr className='my-4' />
              <div className=' flex items-center justify-between '>
                <h3 className='font-semibold '>Số lượng muốn mua:</h3>
                <div className='flex items-center gap-x-2'>
                  <Button size='sm' isIconOnly radius='full' onPress={decreaseQuantity}>
                    <MinusCircleIcon />
                  </Button>
                  <div className='text-base font-medium'>{quantity}</div>
                  <Button size='sm' isIconOnly radius='full' onPress={increaseQuantity}>
                    <PlusCircleIcon />
                  </Button>
                </div>
              </div>
              <hr className='my-4' />
              <div className='flex flex-col '>
                <div className='flex items-center justify-between gap-x-4'>
                  <h3 className='font-semibold '>Tổng tiền đã chọn:</h3>
                  <Currency value={totalPrice} />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color='success' className='font-medium' variant='light' onPress={onClose}>
                Đóng
              </Button>
              <Button
                color='primary'
                className='font-medium text-white
                                bg-gradient-to-r from-lime-400  to-green-600'
                onPress={onClose}
                onClick={onAddToCart}
              >
                Xác nhận
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
export default ConfirmQuantityModal
