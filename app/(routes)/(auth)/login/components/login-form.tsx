'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { AuthExceptionMessages, ErrorInput } from '@/constants/errors.enum'
import { Button } from '@heroui/react'
import axios from 'axios'
import { Messages } from '@/constants/messages.enum'
import { useAuthContext } from '@/providers/auth-provider'

export const LoginForm: React.FC = () => {
  const [onBtnLoad, setOnBtnLoad] = useState(false)
  const router = useRouter()
  const { setUserCallback } = useAuthContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setOnBtnLoad(true)
      const res = await axios.post(`/api/auth/login`, values)
      if (res.data.message) {
        setOnBtnLoad(false)
        toast.error(res.data.message)
      } else {
        setOnBtnLoad(false)
        toast.success(Messages.LOGIN_SUCCESS)
        setUserCallback(res.data)
        router.push('/')
      }
    } catch (error: unknown) {
      console.log('error:::', error)
      setOnBtnLoad(false)
      toast.error(`${AuthExceptionMessages.LOGIN_FAILED}`)
    } finally {
      setOnBtnLoad(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder='Vui lòng nhập địa chỉ email của bạn.'
                  className='w-80 font-light'
                  type='email'
                  {...field}
                  disabled={onBtnLoad}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  id='password'
                  className='w-80 font-light'
                  placeholder='Vui lòng nhập mật khẩu của bạn.'
                  {...field}
                  required
                  disabled={onBtnLoad}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='mt-5'>
          {onBtnLoad ? (
            <Button disabled className='w-full'>
              <Loader2 className='animate-spin' />
              Please wait
            </Button>
          ) : (
            <div>
              <Link className='hover:underline text-[12px]' href='/auth/forget-password'>
                Quên mật khẩu?
              </Link>
              <Button className='w-full bg-gradient-to-r from-red-600 to-red-900 text-white font-medium' type='submit'>
                Đăng nhập
              </Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  )
}

const formSchema = z.object({
  email: z
    .string()

    .email(),
  password: z.string().min(8, {
    message: `${ErrorInput.MIN_ERROR} 8 kí tự.`
  })
})
