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
    <div className='grid gap-6 md:gap-3 items-start'>
      <div className='relative overflow-hidden rounded-lg'>
        <Image
          width={600}
          height={600}
          src={images[mainImageIndex]}
          alt='Product image'
          className='object-cover w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg'
        />
        <div className='absolute inset-0 flex items-center justify-between px-4'>
          <Button onPress={handlePreviousClick} variant='ghost' isIconOnly>
            <ChevronLeft className='w-6 h-6' />
          </Button>
          <Button onPress={handleNextClick} variant='ghost' isIconOnly>
            <ChevronRight className='w-6 h-6' />
          </Button>
        </div>
      </div>

      {/* TODO: thay thế div sang button */}
      <div className='grid grid-cols-5 gap-4'>
        {images.map((image, index) => (
          <div
            className={cn(
              index === mainImageIndex ? 'border-2 border-primary' : 'border-2 border-gray-200',
              'relative overflow-hidden rounded-lg cursor-pointer w-full h-auto'
            )}
            key={index}
            onClick={() => handleImageClick(index)}
          >
            <Image src={image} alt='product image' width={100} height={100} className='object-cover w-full h-full' />
          </div>
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
