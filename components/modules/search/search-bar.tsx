'use client'

import { Button, Input, Listbox, ListboxItem } from '@heroui/react'
import { ArrowDownIcon, ArrowUpIcon, History, SearchIcon, X } from 'lucide-react'
import { JSX, useEffect, useState } from 'react'
import { SearchListBoxWrapper } from './search-listbox-wrapper'
import { SearchProductResponse } from '@/types/products.type'
import { searchSkusByName } from '@/actions/search-skus-by-name'

const SearchBar = () => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isArrowUp, setIsArrowUp] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm)
  const [searchResults, setSearchResults] = useState<SearchProductResponse[]>([])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedTerm(searchTerm)
    }, 300)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [searchTerm])

  useEffect(() => {
    if (debouncedTerm) {
      console.log('Thực hiện tìm kiếm với từ khóa:', debouncedTerm)
      searchSkusByName(debouncedTerm)
        .then(data => {
          console.log('Kết quả tìm kiếm:', data)
          setSearchResults(data)
        })
        .catch((error: unknown) => {
          console.error('Lỗi khi tìm kiếm:', error)
        })
    }
    setSearchResults([])
  }, [debouncedTerm])

  const handleClick = () => {
    if (!showSuggestions) {
      setShowSuggestions(true)
    }
    setIsArrowUp(false)
    console.log('Input field was clicked!')
  }

  const handleCloseSuggestions = () => {
    setIsArrowUp(true)
    setShowSuggestions(false)
  }

  const highlightSearchTerm = (text: string): (string | JSX.Element)[] => {
    if (!searchTerm) return [text]

    const regex = new RegExp(`(${searchTerm})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className='bg-yellow-200 dark:bg-yellow-500 font-bold'>
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  const defaultSuggestions = [
    {
      key: 'SamsungGalaxyA54256GBViolet',
      label: 'Samsung Galaxy A54 256GB Violet',
      href: '/samsung/samsung-galaxy-a54'
    },
    {
      key: 'iPhone15Pro128GBBlack',
      label: 'iPhone 15 Pro 128GB Black',
      href: '/apple/iphone-15-pro'
    },
    {
      key: 'XiaomiRedmiNote12128GBBlue',
      label: 'Xiaomi Redmi Note 12 128GB Blue',
      href: '/xiaomi/xiaomi-redmi-note-12'
    },
    {
      key: 'iPhone 15ProMax256GBSilver',
      label: 'iPhone 15 Pro Max',
      href: '/apple/iphone-15-pro-max'
    }
  ]

  return (
    <div className='w-3/5 flex flex-col items-center'>
      <div className='flex flex-row space-x-4 w-full items-center'>
        <Input
          size='lg'
          placeholder='Nhập vào ô tìm kiếm...'
          radius='full'
          onClick={handleClick}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          startContent={
            <SearchIcon
              className='text-black/50 mb-0.5
                                dark:text-white/90 text-slate-400 
                                pointer-events-none flex-shrink-0'
            />
          }
          endContent={
            <div
              className='flex items-center justify-center
                         rounded-full '
            >
              {isArrowUp ? (
                <ArrowUpIcon
                  className={`text-black/50 dark:text-white/90
                                           w-5 h-5
                             text-slate-400 pointer-events-none flex-shrink-0 transition-transform duration-300`}
                />
              ) : (
                <ArrowDownIcon
                  className={`text-black/50 dark:text-white/90
                                         w-5 h-5
                             text-slate-400 pointer-events-none flex-shrink-0 transition-transform duration-300`}
                />
              )}
            </div>
          }
        />
      </div>

      {showSuggestions && (
        <div className='absolute mt-14 w-3/4 sm:w-3/5 shadow-lg rounded-3xl z-50 bg-slate-100 dark:bg-slate-900 '>
          <div className='flex justify-end'>
            <Button isIconOnly onPress={handleCloseSuggestions} radius='full'>
              <X className='w-4 h-4 text-slate-800 dark:text-slate-200' />
            </Button>
          </div>

          <ul className='list-none'>
            {searchResults.length > 0 ? (
              <div>
                <SearchListBoxWrapper>
                  <Listbox items={searchResults} aria-label='Search Results'>
                    {item => (
                      <ListboxItem key={item.id} href={`${item.brandUrl}/${item.slug}`}>
                        {highlightSearchTerm(item.productName)}
                      </ListboxItem>
                    )}
                  </Listbox>
                </SearchListBoxWrapper>
              </div>
            ) : (
              <div>
                <li className='py-2 px-4'>Mọi người cũng tìm kiếm:</li>
                <SearchListBoxWrapper>
                  <Listbox items={defaultSuggestions} aria-label='Default suggestions'>
                    {item => (
                      <ListboxItem
                        key={item.key}
                        href={item.href}
                        startContent={<History className='w-4 h-4 text-slate-500' />}
                      >
                        {item.label}
                      </ListboxItem>
                    )}
                  </Listbox>
                </SearchListBoxWrapper>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchBar
