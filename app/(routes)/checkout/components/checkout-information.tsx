'use client'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Link, Switch } from '@heroui/react'
import { ChevronRight } from 'lucide-react'
import { DiscountCodeCombobox } from './discount-code-combobox'
import { Label } from '@/components/ui/label'
import Currency from '@/components/utilities/currency'
import { FC } from 'react'
import { Cart } from '@/types/orders.type'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface CheckoutInformationProps {
  data: Cart
}
const CheckoutInformation: FC<CheckoutInformationProps> = ({ data }) => {
  const router = useRouter()
  const onPayment = () => {
    router.push('/')
    toast.success('Thanh toán thành công.')
  }

  return (
    <div
      className='flex-1 md:flex-[1] dark:shadow-slate-500/50 dark:border-slate-400 border-2
                bg-white dark:bg-slate-950 rounded-3xl p-4 h-[560px]'
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='bordered'
            className='w-full mr-5 mb-3 flex justify-between items-center text-base font-medium'
          >
            <p className='items-start'>Chọn ngay ưu đãi</p>
            <ChevronRight className='ml-auto' />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Khuyến mãi và ưu đãi</SheetTitle>
            <SheetDescription>Hiện tại không có mã khuyến mãi nào khả dụng</SheetDescription>
          </SheetHeader>

          <DiscountCodeCombobox />

          <SheetFooter>
            <SheetClose asChild>
              <Button
                variant='shadow'
                className='w-full bg-gradient-to-r from-red-600 to-red-900 text-white
                     font-medium'
                isDisabled
              >
                Áp dụng
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div className='flex items-center justify-between space-x-2  p-4'>
        <Label htmlFor='necessary' className='flex flex-col space-y-1'>
          <span>Đổi điểm tích lũy</span>
          <span className='font-normal leading-snug text-muted-foreground'>
            Vui lòng đăng nhập để có thể thực hiện tính năng đổi điểm.
          </span>
        </Label>
        <Switch disabled aria-readonly color='warning' />
      </div>
      <Card className='max-w-full dark:bg-slate-900 bg-white' radius='lg'>
        <CardHeader className='flex gap-3'>
          <p className='text-xl font-semibold'>Thông tin thanh toán</p>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className='flex justify-between mb-2'>
            <span>Tổng tiền</span>
            <Currency className='text-xl' value={data.totalPrice} />
          </div>
          <div className='flex justify-between mb-2'>
            <span>Tổng khuyến mãi</span>
            <Currency className='text-xl text-red-600' value={0} />
          </div>
          <div className='flex justify-between mb-2'>
            <span>Phí vận chuyển</span>
            <span>Miễn phí</span>
          </div>
          <Divider />
          <div className='flex justify-between mb-2 font-bold'>
            <span>Cần thanh toán</span>

            <Currency value={data.totalPrice} />
          </div>
          <div className='flex justify-between mb-2 '>
            <span className='text-base font-bold '>Điểm thưởng</span>
            <span className='text-base font-bold text-yellow-500'>
              + {Math.floor(data.totalPrice / 1000).toLocaleString()}
            </span>
          </div>

          <Button
            variant='shadow'
            onPress={onPayment}
            className='w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-medium duration-300 transition-opacity'
          >
            Thanh toán
          </Button>
        </CardBody>
        <Divider />
        <CardFooter>
          <p className='text-xs text-center'>
            Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{' '}
            <Link href='#' underline='always' className='text-yellow-500 text-xs'>
              Điều khoản dịch vụ
            </Link>{' '}
            và{' '}
            <Link href='#' underline='always' className='text-yellow-500 text-xs'>
              Chính sách xử lý dữ liệu cá nhân
            </Link>{' '}
            của Cửa hàng thương mại điện tử My Phone.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CheckoutInformation
