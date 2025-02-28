'use client'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@heroui/react'
interface ImageSliderProps {
  images: string[]
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0)
  function handlePreviousClick() {
    setMainImageIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }
  function handleNextClick() {
    setMainImageIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }
  function handleImageClick(index: number) {
    setMainImageIndex(index)
  }

  return (
    <div className='grid gap-6 md:gap-3 items-start mt-2'>
      <div className='relative overflow-hidden shadow rounded-xl p-2'>
        <Image
          width={500}
          height={500}
          src={images[mainImageIndex]}
          alt='Product image'
          className='object-cover w-full h-[256px] sm:h-[350px] md:h-[450px] lg:h-[550px] rounded-lg'
        />
        <div className='absolute inset-0 flex items-center justify-between px-4'>
          <Button onPress={handlePreviousClick} variant='ghost' isIconOnly>
            <ChevronLeft className='w-6 h-6 dark:text-slate-800' />
          </Button>
          <Button onPress={handleNextClick} variant='ghost' isIconOnly>
            <ChevronRight className='w-6 h-6 dark:text-slate-800' />
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-5 gap-4'>
        {images.map((image, index) => (
          <Button
            className={cn(
              index === mainImageIndex ? 'border-2 border-primary' : 'border-2 border-gray-200',
              'relative overflow-hidden rounded-lg cursor-pointer w-full h-auto'
            )}
            key={index}
            onPress={() => handleImageClick(index)}
          >
            <Image src={image} alt='product image' width={100} height={100} className='object-cover w-full h-full' />
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ImageSlider

//   function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>, index: number) {
//     if (event.key === 'Enter' || event.key === ' ') {
//       handleImageClick(index)
//     }
//   }
