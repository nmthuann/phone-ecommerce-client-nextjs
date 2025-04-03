'use client'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@heroui/react'
import { ErrorInput } from '@/constants/errors.enum'

const formSchema = z.object({
  fullName: z
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
    })
})

export const CustomerOrderForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      fullName: '',
      phone: ''
    }
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='  space-y-3 '>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input isRequired label='Họ Và Tên' placeholder='Vui lòng nhập họ và tên' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input isRequired label='Phone' placeholder='Vui lòng nhập Số điện thoại' type='number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input label='Email' placeholder='Vui lòng nhập email' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
