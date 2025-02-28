'use client'
import { EyeFilledIcon } from '@/components/assets/icons/eye-filled-icon'
import { EyeSlashFilledIcon } from '@/components/assets/icons/eyeslash-filled-icon'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { ErrorInput, SystemError } from '@/constants/errors.enum'
import { Button, Input, Link, Spinner } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

type RegisterFormValues = z.infer<typeof registerFormSchema>
const defaultValues: Partial<RegisterFormValues> = {
  avatarUrl: 'https://res.cloudinary.com/ddyreawwf/image/upload/v1732779960/no-image_ur9qsg.jpg',
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  phone: ''
}

export const RegisterForm = () => {
  const router = useRouter()
  const [onBtnLoad, setOnBtnLoad] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const togglePassowrdVisibility = () => setIsPasswordVisible(!isPasswordVisible)
  const toggleConfirmPasswordVisibility = () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)

  // const { setUserCallback } = useAuthContext()

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues
  })

  async function onSubmit(values: RegisterFormValues) {
    try {
      setOnBtnLoad(true)
      console.log(values)
    } catch (error: unknown) {
      console.log(error)
      setOnBtnLoad(false)
      toast.error(`${SystemError.INTERNAL_SERVER_ERROR}`)
    } finally {
      setOnBtnLoad(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        {/* Email */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => {
            const isInvalid = !!form.formState.errors.email
            return (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    isRequired
                    label='Tên'
                    placeholder='Vui lòng nhập địa chỉ email'
                    type='text'
                    isInvalid={isInvalid}
                    errorMessage={isInvalid ? form.formState.errors.firstName?.message : ''}
                    onValueChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )
          }}
        />
        {/* first name*/}
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => {
            const isInvalid = !!form.formState.errors.firstName
            return (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    isRequired
                    label='Tên'
                    placeholder='Vui lòng nhập Tên'
                    type='text'
                    isInvalid={isInvalid}
                    errorMessage={isInvalid ? form.formState.errors.firstName?.message : ''}
                    onValueChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )
          }}
        />
        {/* last name*/}
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => {
            const isInvalid = !!form.formState.errors.lastName
            return (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    isRequired
                    label='Họ'
                    placeholder='Vui lòng nhập Họ'
                    type='text'
                    isInvalid={isInvalid}
                    errorMessage={isInvalid ? form.formState.errors.lastName?.message : ''}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        {/* Số Điện thoại */}
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => {
            const isInvalid = !!form.formState.errors.phone
            return (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    label='Số điện thoại'
                    type='number'
                    isRequired
                    placeholder='Vui lòng nhập số điện thoại'
                    isInvalid={isInvalid}
                    errorMessage={isInvalid ? form.formState.errors.phone?.message : ''}
                    onValueChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )
          }}
        />
        {/* password*/}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => {
            const isInvalid = !!form.formState.errors.password
            return (
              <FormItem>
                <FormControl>
                  <Input
                    isRequired
                    label='Mật khẩu'
                    placeholder='Vui lòng nhập mật khẩu'
                    description='Mật Khẩu phải đủ 8 kí tự.'
                    endContent={
                      <button
                        className='focus:outline-none'
                        type='button'
                        onClick={togglePassowrdVisibility}
                        aria-label='toggle password visibility'
                      >
                        {isPasswordVisible ? (
                          <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                        ) : (
                          <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                        )}
                      </button>
                    }
                    type={isPasswordVisible ? 'text' : 'password'}
                    {...field}
                    // onChangeCapture={handlePasswordChange}
                    isInvalid={isInvalid}
                    errorMessage={isInvalid ? form.formState.errors.password?.message : ''}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
        {/* confirm password*/}
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => {
            const isInvalid = !!form.formState.errors.confirmPassword
            return (
              <FormItem>
                <FormControl>
                  <Input
                    isRequired
                    label='Nhập lại Mật khẩu'
                    placeholder='Nhập lại mật khẩu'
                    endContent={
                      <button
                        className='focus:outline-none'
                        type='button'
                        onClick={toggleConfirmPasswordVisibility}
                        aria-label='toggle password visibility'
                      >
                        {isConfirmPasswordVisible ? (
                          <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                        ) : (
                          <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                        )}
                      </button>
                    }
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    {...field}
                    // onChangeCapture={
                    //     handleConfirmPasswordChange
                    // }
                    isInvalid={isInvalid}
                    errorMessage={isInvalid ? form.formState.errors.confirmPassword?.message : ''}
                    onValueChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )
          }}
        />

        <div className='mt-5'>
          {onBtnLoad ? (
            <Button isDisabled className='w-full  font-medium'>
              <Spinner color='success' size='sm' />
              Vui lòng chờ ...
            </Button>
          ) : (
            <Button
              className='w-full bg-gradient-to-r from-red-600 to-red-900 text-white font-medium'
              type='submit'
              variant='shadow'
            >
              Đăng ký
            </Button>
          )}
        </div>
        <p className='text-center text-small'>
          Bạn đã có tài khoản?{' '}
          <Link size='sm' onPress={() => router.push('login')} underline='hover' className='cursor-pointer'>
            Đăng nhập
          </Link>
        </p>
      </form>
    </Form>
  )
}

const registerFormSchema = z
  .object({
    avatarUrl: z.string().nullish(),
    email: z
      .string({
        required_error: ErrorInput.EMAIL_ERROR
      })
      .email(),
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
    // gender: z.enum(['male', 'female', 'other'], {
    //   invalid_type_error: `${ErrorInput.NOT_SELECT_FIELD} giới tính.`,
    //   required_error: `${ErrorInput.NOT_SELECT_FIELD} giới tính.`
    // }),
    // birthday: z.date({
    //   required_error: `${ErrorInput.NOT_SELECT_FIELD} ngày sinh.`
    // }),
    password: z.string().min(8, {
      message: `${ErrorInput.MIN_ERROR} 8 kí tự.`
    }),
    confirmPassword: z.string().min(8, {
      message: ErrorInput.PASSWORD_ERROR
    })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: `${ErrorInput.PASSWORD_NOT_MATCH}`,
    path: ['confirmPassword'] // Đặt lỗi vào trường confirmPassword
  })
