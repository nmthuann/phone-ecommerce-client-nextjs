'use client'
import { Button, Input } from '@heroui/react'
import { ArrowDownIcon, ArrowUpIcon, SearchIcon, X } from 'lucide-react'
import { useState } from 'react'

const SearchBar = () => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isArrowUp, setIsArrowUp] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

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
        <div className='absolute mt-14 w-3/4 sm:w-3/5 shadow-lg rounded-3xl z-50 bg-slate-100 dark:bg-slate-950'>
          <div className='flex justify-end'>
            <Button isIconOnly onPress={handleCloseSuggestions} radius='full'>
              <X className='w-4 h-4 text-slate-800 dark:text-slate-200' />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
