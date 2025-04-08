import Loading from '../loading'
import { getProductBySlug } from '@/actions/get-product-by-slug'
import { ProductBreadcumb } from './components/product-breadcumb'
import LoadingOverlay from '@/components/loading-overlay'
import { Suspense } from 'react'
import ImageSlider from './components/image-slider'
import ProductInformationTabs from './components/product-information-tabs'
import ProductDetail from './components/product-detail'
import { ErrorComponent } from '@/components/errors/error-component'
import {
  BadgePercentIcon,
  CreditCardIcon,
  HeadphonesIcon,
  PackageCheck,
  RefreshCw,
  ShieldCheck,
  ShieldCheckIcon,
  Truck,
  TruckIcon
} from 'lucide-react'
import OffersList from './components/offer-list'
import { Divider } from '@heroui/react'
import Footer from '@/components/layouts/footer'
import ProductPolicy from './components/policy'
import Benefit from './components/benefit'
import { getBrandByUrl } from '@/actions/get-brand'

const ProductPage = async ({ params }: { params: Promise<{ brandUrl: string; slug: string }> }) => {
  const { brandUrl, slug } = await params
  try {
    const brand = await getBrandByUrl(brandUrl)
    const product = await getProductBySlug(slug)
    const imageList = product.sku.map(sku => sku.image)

    if (!brand || !product) {
      return <LoadingOverlay loading={true} text='Please wait...' />
    }

    return (
      <div>
        <div className='flex flex-col'>
          <div className='flex flex-col md:flex-row h-auto mt-5 mb-5 space-x-2 ml-2 mr-2'>
            <div className='w-full md:w-1/2 dark:bg-slate-950  p-4 space-y-4 rounded-3xl '>
              {/* Breadcrumbs */}
              <div className='mb-4'>
                <ProductBreadcumb brand={brand} product={product} />
              </div>

              <Suspense fallback={<Loading />}>
                <ImageSlider images={imageList} />
              </Suspense>

              <Suspense fallback={<Loading />}>
                <ProductInformationTabs data={product} />
              </Suspense>
            </div>

            <div
              className='w-full md:w-1/2 dark:bg-slate-950  rounded-3xl z-50
                        opacity-95 mt-4 mb-4 space-y-2'
            >
              <Suspense fallback={<Loading />}>
                <ProductDetail product={product} />
              </Suspense>
              <OffersList offers={offersData} />
              <ProductPolicy policies={policiesData} />
            </div>
          </div>
        </div>
        <div className='mb-4'>
          <Benefit benefits={benefits} />
        </div>
        <Divider />
        <Footer />
      </div>
    )
  } catch (error: unknown) {
    console.log(error)
    return <ErrorComponent title='Sản phẩm không tồn tại' message='Không tìm thấy sản phẩm bạn yêu cầu.' />
  }
}

export default ProductPage

const offersData = [
  {
    id: 1,
    icon: <BadgePercentIcon className='w-5 h-5' />,
    text: 'Tặng phiếu mua hàng 50,000đ khi mua sim FPT kèm máy'
  },
  {
    id: 2,
    icon: <CreditCardIcon className='w-5 h-5' />,
    text: 'Trả góp 0% lãi suất, MIỄN PHÍ chuyển đổi kì hạn 3 - 6 tháng qua thẻ tín dụng'
  },
  {
    id: 3,
    icon: <BadgePercentIcon className='w-5 h-5' />,
    text: 'Tặng mã ưu đãi giảm ngay 3% khi mua Máy tính bảng, Đồng hồ thông minh, Điện máy'
  }
]

const policiesData = [
  { id: 1, icon: <ShieldCheckIcon className='w-5 h-5' />, text: 'Hàng chính hãng - Bảo hành 12 tháng' },
  { id: 2, icon: <TruckIcon className='w-5 h-5' />, text: 'Giao hàng toàn quốc' },
  { id: 3, icon: <HeadphonesIcon className='w-5 h-5' />, text: 'Kỹ thuật viên hỗ trợ trực tuyến' }
]

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Thương hiệu đảm bảo',
    description: 'Nhập khẩu, bảo hành chính hãng'
  },
  {
    icon: RefreshCw,
    title: 'Đổi trả dễ dàng',
    description: 'Theo chính sách đổi trả tại My Phone Shop.'
  },
  {
    icon: PackageCheck,
    title: 'Sản phẩm chất lượng',
    description: 'Đảm bảo tương thích và độ bền cao'
  },
  {
    icon: Truck,
    title: 'Giao hàng tận nơi',
    description: 'Tại 63 tỉnh thành'
  }
]
