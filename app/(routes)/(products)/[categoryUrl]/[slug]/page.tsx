import { getCategoryByUrl } from '@/actions/get-category'
import Loading from '../loading'
import { getProductBySlug } from '@/actions/get-product-by-slug'
import { ProductBreadcumb } from './components/product-breadcumb'
import LoadingOverlay from '@/components/loading-overlay'
import { Suspense } from 'react'
import ImageSlider from './components/image-slider'
import ProductInformationTabs from './components/product-information-tabs'
import ProductDetail from './components/product-detail'
import { ErrorComponent } from '@/components/errors/error-component'

const ProductPage = async ({ params }: { params: { categoryUrl: string; slug: string } }) => {
  const { categoryUrl, slug } = await Promise.resolve(params) // Đảm bảo params được awaited

  try {
    const category = await getCategoryByUrl(categoryUrl)
    const product = await getProductBySlug(slug)
    const imageList = product.sku.map(sku => sku.image)

    if (!category || !product) {
      return <LoadingOverlay loading={true} text='Please wait...' />
    }

    return (
      <div className='flex flex-col'>
        <div className='flex flex-col md:flex-row h-auto mt-5 mb-5 space-x-2 ml-2 mr-2'>
          <div
            className='w-full md:w-1/2 dark:bg-slate-950 
                        shadow p-4 space-y-4 rounded-3xl '
          >
            {/* Breadcrumbs */}
            <div className='mb-4'>
              <ProductBreadcumb category={category} product={product} />
            </div>

            <Suspense fallback={<Loading />}>
              <ImageSlider images={imageList} />
            </Suspense>

            <Suspense fallback={<Loading />}>
              <ProductInformationTabs data={product} />
            </Suspense>
          </div>

          <div
            className='w-full md:w-1/2 dark:bg-slate-950 shadow rounded-3xl z-50
                        bg-white opacity-95 mt-4  mb-4'
          >
            <Suspense fallback={<Loading />}>
              <ProductDetail product={product} />
            </Suspense>
          </div>
        </div>
      </div>
    )
  } catch (error: unknown) {
    console.log(error)
    return <ErrorComponent title='Sản phẩm không tồn tại' message='Không tìm thấy sản phẩm bạn yêu cầu.' />
  }
}

export default ProductPage
