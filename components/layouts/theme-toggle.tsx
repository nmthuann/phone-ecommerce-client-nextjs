'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react'

export function ThemeToggle() {
  const { setTheme } = useTheme()

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          variant='faded'
          className='rounded-full border-2 shadow-md dark:bg-slate-900 bg-white dark:border-slate-400'
        >
          <Sun className='h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-slate-800 dark:text-slate-400' />
          <Moon className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-slate-800 dark:text-slate-400' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Theme Selection'>
        <DropdownItem key='light' onPress={() => setTheme('light')}>
          Sáng
        </DropdownItem>
        <DropdownItem key='dark' onPress={() => setTheme('dark')}>
          Tối
        </DropdownItem>
        <DropdownItem key='system' onPress={() => setTheme('system')}>
          Hệ thống
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
