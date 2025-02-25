// 'use client'
// import { ProductCard } from '@/types/products.type'
// import { Button } from '@heroui/react'
// import { KanbanSquareDashed, Undo } from 'lucide-react'
// import { useRouter } from 'next/navigation'

// interface ProductSpecialProps {
//   data: ProductCard[]
// }

// const ProductSpecial: React.FC<ProductSpecialProps> = ({ data }) => {
//   const router = useRouter()
//   return (
//     <div className='ml-5 mr-5'>
//       <div className='flex items-center justify-between mt-4 mb-4'>
//         <h2 className='text-blue-600 font-bold text-2xl sm:text-3xl md:text-4xl'>Sản Phẩm nổi bật</h2>
//       </div>
//       <div>
//         <div
//           className='
//                 grid
//                 grid-cols-1
//                 sm:grid-cols-2
//                 md:grid-cols-3
//                 lg:grid-cols-4
//                 xl:grid-cols-5
//                 gap-4
//                 ml-5 mr-5

//                 '
//         >
//           {data.length > 0 ? (
//             data.map((productCard: ProductCard, i) => (
//               <div key={i}>
//                 <ProductCard key={productCard.id} data={productCard} />
//               </div>
//             ))
//           ) : (
//             <div
//               className='
//                         flex flex-col items-center justify-center
//                         col-span-full text-center py-20
//                         '
//             >
//               <KanbanSquareDashed className='text-gray-500 w-16 h-16 mb-4' />
//               <p className='text-lg text-gray-600'>Hiện tại không có sản phẩm nào.</p>
//               <Button
//                 color='warning'
//                 size='lg'
//                 className='mt-6 font-semibold text-base'
//                 onPress={() => router.push('/')}
//                 endContent={<Undo />}
//                 aria-label='Quay lại trang chủ'
//               >
//                 Quay lại trang chủ
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ProductSpecial
