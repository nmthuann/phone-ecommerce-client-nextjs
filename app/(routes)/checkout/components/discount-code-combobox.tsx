'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'

const frameworks = [
  {
    value: 'sale_8/8',
    label: 'Săn Sale 8/8'
  },
  {
    value: 'sale_summer',
    label: 'Chào đón mùa hè rộn rã'
  },
  {
    value: 'sale_7/7',
    label: 'Săn sale 7/7'
  },
  {
    value: 'sale_comback_school',
    label: 'Chào mừng đến trường.'
  }
]

export function DiscountCodeCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          // role="combobox"
          aria-expanded={open}
          className='w-full justify-between mt-5 mb-5'
        >
          {value ? frameworks.find(framework => framework.value === value)?.label : 'Tìm kiếm mã giảm giá...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandInput placeholder='Tìm kiếm mã giảm giá...' />
          <CommandList>
            <CommandEmpty>Không tìm thấy mã giảm giá.</CommandEmpty>
            <CommandGroup>
              {frameworks.map(framework => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={currentValue => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === framework.value ? 'opacity-100' : 'opacity-0')} />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
