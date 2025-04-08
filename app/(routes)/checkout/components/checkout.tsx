'use client'

import { City, District, Ward } from '@/types/location.type'
import { FC, useEffect, useState } from 'react'
import useCart from '@/hooks/use-cart'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  ScrollShadow,
  Switch,
  Textarea,
  Checkbox,
  cn,
  Input,
  Select,
  SelectItem
} from '@heroui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight, HandCoins } from 'lucide-react'
import { OrderItem } from './order-item'

import Image from 'next/image'
import stripeLogo from '../../../../public/payments/images.png'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { DiscountCodeCombobox } from './discount-code-combobox'
import { Label } from '@/components/ui/label'
import Currency from '@/components/utilities/currency'
import toast from 'react-hot-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorInput } from '@/constants/errors.enum'
import { PaymentMethodEnum } from '@/constants/payment-method.enum'
import axios from 'axios'
import LoadingOverlay from '@/components/loading-overlay'

interface CheckoutProps {
  location: City[]
}
type FormValues = z.infer<typeof formSchema>

const Checkout: FC<CheckoutProps> = ({ location }) => {
  const cart = useCart()
  const router = useRouter()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('')

  const totalPrice = cart.items.reduce((total, item) => total + item.sellingPrice * 1, 0)
  const handleCheckboxChange = (method: string) => {
    setSelectedMethod(method)
  }

  const [city, setCity] = useState<string>('')
  const [districtList, setDistrictList] = useState<District[]>([])
  const [district, setDistrict] = useState<string>('')
  const [wardList, setWardList] = useState<Ward[]>([])

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('city:::', city) // TODO: check city is redundant
    const selectedCityId: string = event.target.value
    setCity(selectedCityId)
    const selectedDistricts = location.find((city: City) => city.Id === selectedCityId)
    if (selectedDistricts) {
      setDistrictList(selectedDistricts.Districts || [])
    } else {
      setDistrictList([])
    }
  }

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('district:::', district) // TODO: check district is redundant
    const selectedDistrictId: string = event.target.value
    setDistrict(selectedDistrictId)
    const selectedWards: District | undefined = districtList.find(
      (district: District) => district.Id === selectedDistrictId
    )

    if (selectedWards) {
      setWardList(selectedWards.Wards || [])
    } else {
      setWardList([])
    }
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      city: '',
      district: '',
      ward: '',
      address: '',
      note: ''
    }
  })

  const searchParams = useSearchParams()
  const removeAll = useCart(state => state.removeAll)
  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Đặt hàng thành công (Stripe)')
      cart.removeAll()
      router.replace('/') // ✅ dùng replace thay vì push để không lặp lại toast nếu refresh
    }
    if (searchParams.get('canceled')) {
      toast.error('Đặt hàng thất bại (Stripe)')
    }
  }, [searchParams, removeAll])

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true) // ✅ Bắt đầu loading

    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        contactPhone: values.phone,
        shippingAddress: `${values.address}, ${values.ward}, ${values.district}, ${values.city}`,
        shippingMethod: 'GHTK',
        paymentMethod: selectedMethod,
        note: values.note ?? '',
        cart: cart.items.map(item => ({
          skuId: item.id
        }))
      }

      console.log('Sending payload:', payload)

      const response = await axios.post('/api/checkout', payload)

      const data = response.data

      if (data.success) {
        if (data.data?.url) {
          window.location.href = data.data.url // Stripe
        } else {
          cart.removeAll() // Xóa giỏ hàng sau khi đặt hàng thành công
          toast.success('Đặt hàng thành công (COD)')
          router.push('/') // hoặc redirect tới trang cảm ơn
        }
      } else {
        toast.error(data.error || 'Đặt hàng thất bại')
      }
    } catch (err: unknown) {
      console.error('Checkout error:', err)
      // toast.error('Lỗi hệ thống. Vui lòng thử lại.')
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status
        const errorMsg = err.response.data?.error || 'Đã xảy ra lỗi'

        if (status === 400) {
          toast.error(`Lỗi 400: ${errorMsg}`)
        } else if (status === 404) {
          toast.error(`Không tìm thấy tài nguyên (404)`)
        } else if (status === 500) {
          toast.error(`Lỗi máy chủ (500)`)
        } else {
          toast.error(`Lỗi không xác định (${status})`)
        }
      } else {
        console.error('Unknown error:', err)
        toast.error('Lỗi không xác định. Vui lòng thử lại.')
      }
    } finally {
      setIsSubmitting(false) // ✅ Kết thúc loading
    }
  }

  return (
    <div>
      <div>
        <Button
          onPress={() => {
            router.back()
          }}
          color='default'
          variant='light'
          startContent={<ChevronLeft />}
        >
          Quay lại giỏ hàng
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col md:flex-row h-auto mt-5 mb-5 ml-2 mr-2 rounded-3xl border-none space-x-4'
        >
          <div
            className='flex-1 md:flex-[2] 
                bg-gray-50 dark:bg-slate-950 shadow p-4 space-y-4 rounded-3xl'
          >
            <div>
              <Card isBlurred className='border-none bg-background/60 dark:bg-default-100/50 max-w-full' shadow='sm'>
                <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
                  <h4 className='font-bold text-large'>{`Sản phẩm trong đơn hàng (${cart.items.length})`}</h4>
                  <small className='text-default-500'>{`Bạn đã chọn ${cart.items.length} sản phẩm để thanh toán`}</small>
                </CardHeader>
                <CardBody>
                  <ScrollShadow className='w-full h-56'>
                    <div className='space-y-4'>
                      {cart.items.map(item => (
                        <OrderItem
                          key={item.id}
                          image={item.image}
                          productName={item.skuName}
                          price={item.sellingPrice}
                        />
                      ))}
                    </div>
                  </ScrollShadow>
                </CardBody>
              </Card>
            </div>
            <h4 className='font-bold text-large'>Thông tin khách hàng</h4>
            {/* FIRSTNAME */}
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input isRequired label='Tên' placeholder='Nhập tên của bạn ...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LASTNAME */}
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input isRequired label='Họ' placeholder='Nhập họ của bạn ...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PHONE */}
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input isRequired label='Số điện thoại' placeholder='Nhập số điện thoại' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* EMAIL */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input label='Email' placeholder='Nhập email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ADDRESS */}
            <h4 className='font-bold text-large mt-6'>Hình thức nhận hàng</h4>
            {/* City */}
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      isRequired
                      label='Tỉnh thành'
                      placeholder='Chọn tỉnh'
                      className='max-w-full'
                      selectionMode='single'
                      {...field} // Spread operator sau khi định nghĩa onChange
                      onChange={event => {
                        handleCityChange(event)
                        field.onChange(event) // Gọi sự kiện onChange từ field
                      }}
                    >
                      {location.map((city: City) => (
                        <SelectItem
                          key={city.Id}
                          onPress={() => {
                            form.setValue('city', city.Name)
                          }}
                        >
                          {city.Name}
                        </SelectItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* District */}
            <FormField
              control={form.control}
              name='district'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      isRequired
                      label='Quận/ Huyện'
                      placeholder='Chọn quận/ huyện'
                      className='max-w-full'
                      selectionMode='single'
                      {...field} // Spread operator sau khi định nghĩa onChange
                      onChange={event => {
                        handleDistrictChange(event)
                        field.onChange(event) // Gọi sự kiện onChange từ field
                      }}
                    >
                      {districtList.map(district => (
                        <SelectItem
                          key={district.Id}
                          onPress={() => {
                            form.setValue('district', district.Name)
                          }}
                        >
                          {district.Name}
                        </SelectItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Ward */}
            <FormField
              control={form.control}
              name='ward'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      isRequired
                      items={wardList}
                      label='Phường/ Xã'
                      placeholder='Chọn phường/ xã'
                      selectionMode='single'
                      className='max-w-full'
                      {...field}
                    >
                      {ward => (
                        <SelectItem
                          key={ward.Id}
                          onPress={() => {
                            form.setValue('ward', ward.Name)
                          }}
                        >
                          {ward.Name}
                        </SelectItem>
                      )}
                    </Select>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Địa Chỉ */}
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input isRequired label='Địa chỉ' placeholder='Vui lòng nhập địa chỉ nhà, đường ...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* NOTE */}
            <FormField
              control={form.control}
              name='note'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea label='Ghi chú' placeholder='Nhập ghi chú (tùy chọn)' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* CHOOSE PAYMENT METHOD */}
            <Card isBlurred className='border-none bg-background/60 dark:bg-default-100/50 max-w-full' shadow='sm'>
              <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
                <h4 className='font-bold text-large'>Phương thức thanh toán</h4>
                <small className='text-default-500'>Hãy Chọn phương thức thanh toán phù hợp với nhu cầu của bạn.</small>
              </CardHeader>
              <CardBody>
                <div className='w-full space-y-2'>
                  <Checkbox
                    aria-label='payment-method'
                    classNames={{
                      base: cn(
                        'inline-flex w-full max-w-full bg-content1',
                        'hover:bg-content2 items-center justify-start',
                        'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
                        'data-[selected=true]:border-primary'
                      ),
                      label: 'w-full'
                    }}
                    isSelected={selectedMethod === PaymentMethodEnum.COD_PAYMENT_METHOD}
                    onValueChange={() => handleCheckboxChange(PaymentMethodEnum.COD_PAYMENT_METHOD)}
                  >
                    <div className='w-full flex justify-start items-center gap-2'>
                      <HandCoins size={32} />
                      <span className='text-base font-medium text-default-500'>Thanh toán khi nhận hàng</span>
                    </div>
                  </Checkbox>
                  <Checkbox
                    aria-label='payment-method-stripe'
                    classNames={{
                      base: cn(
                        'inline-flex w-full max-w-full bg-content1',
                        'hover:bg-content2 items-center justify-start',
                        'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
                        'data-[selected=true]:border-primary'
                      ),
                      label: 'w-full'
                    }}
                    isSelected={selectedMethod === PaymentMethodEnum.STRIPE_PAYMENT_METHOD}
                    onValueChange={() => handleCheckboxChange(PaymentMethodEnum.STRIPE_PAYMENT_METHOD)}
                  >
                    <div className='w-full flex justify-start items-center gap-2'>
                      <Image src={stripeLogo} width={32} height={32} alt='stripe-logo' className=' ' />
                      <span className='text-base font-medium text-default-500'>
                        Thanh toán online qua cổng thanh toán quốc tế Stripe
                      </span>
                    </div>
                  </Checkbox>
                </div>
              </CardBody>
            </Card>
          </div>

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
                  <Currency className='text-xl' value={totalPrice} />
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

                  <Currency value={totalPrice} />
                </div>
                <div className='flex justify-between mb-2 '>
                  <span className='text-base font-bold '>Điểm thưởng</span>
                  <span className='text-base font-bold text-yellow-500'>
                    + {Math.floor(totalPrice / 1000).toLocaleString()}
                  </span>
                </div>

                <Button
                  variant='shadow'
                  type='submit'
                  isLoading={isSubmitting}
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
        </form>
      </Form>
      <LoadingOverlay loading={isSubmitting} />
    </div>
  )
}
//
//
export default Checkout

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: `${ErrorInput.MIN_ERROR} 2 kí tự.`
    })
    .max(10, {
      message: `${ErrorInput.MAX_ERROR} 10 kí tự.`
    })
    .refine(
      value => {
        return !/\d/.test(value) && value.trim() !== '' && /^[^\s]*$/.test(value)
      },
      {
        message: ErrorInput.NAME_INVALID
      }
    ),
  lastName: z.string().min(2, {
    message: `${ErrorInput.MIN_ERROR} 2 kí tự.`
  }),
  phone: z.string().refine(value => /^\d{10}$/.test(value), {
    message: ErrorInput.PHONE_NUMBER_ERROR
  }),
  email: z
    .string()
    .min(2, {
      message: `${ErrorInput.MIN_ERROR} 2 kí tự.`
    })
    .email({
      message: ErrorInput.EMAIL_INVALID
    }),
  address: z.string().min(1, {
    message: `${ErrorInput.NOT_FULL_FIELD}`
  }),
  city: z.string().min(1, {
    message: `${ErrorInput.NOT_FULL_FIELD}`
  }),
  district: z.string().min(1, {
    message: `${ErrorInput.NOT_FULL_FIELD}`
  }),
  ward: z.string().min(1, {
    message: `${ErrorInput.NOT_FULL_FIELD}`
  }),
  note: z.string().optional()
})
