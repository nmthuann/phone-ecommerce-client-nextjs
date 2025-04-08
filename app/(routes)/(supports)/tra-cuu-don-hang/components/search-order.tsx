'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const formSchema = z.object({
  email: z.string().min(2, {
    message: 'email must be at least 2 characters.'
  })
})
const SearchOrderForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
  return (
    <div className='max-w-md w-full mx-auto mt-10 mb-10 p-6 bg-white rounded-xl shadow-md dark:bg-slate-800'>
      <h2 className='text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white'>Tra cứu đơn hàng</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-sm font-semibold text-slate-700 dark:text-slate-200'>Email</FormLabel>
                <FormControl>
                  <Input placeholder='nhập email bạn đã dùng khi đặt hàng...' {...field} className='w-full' />
                </FormControl>
                <FormDescription className='text-sm text-slate-500'>
                  Nhập đúng email để xem đơn hàng của bạn.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='w-full bg-gradient-to-r from-red-600 to-red-900 text-white text-base font-medium py-2'
          >
            Tra cứu đơn hàng
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SearchOrderForm
