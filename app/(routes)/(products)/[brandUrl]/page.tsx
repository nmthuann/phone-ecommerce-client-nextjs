import { Divider } from '@heroui/react'
import CategoryExplorer from './components/category-explorer'
import Footer from '@/components/layouts/footer'
import { ErrorComponent } from '@/components/errors/error-component'
import NotFoundComponent from '@/components/errors/not-found-component'
import { getProducts } from '@/actions/get-products'
import { getBrandByUrl } from '@/actions/get-brand'

const BrandPage = async ({ params }: { params: Promise<{ brandUrl: string }> }) => {
  const { brandUrl } = await params
  if (!brandUrl) {
    return <NotFoundComponent />
  }

  try {
    const brand = await getBrandByUrl(brandUrl)

    if (!brand) {
      return <NotFoundComponent />
    }

    const products = await getProducts(brandUrl, 1, 10)

    return (
      <div>
        <CategoryExplorer brand={brand} products={products.data} />
        <Divider />
        <Footer />
      </div>
    )
  } catch (error: unknown) {
    console.error(error)
    return <ErrorComponent title='Brand Page' message='Failed to load Brands or Products. Please try again later.' />
  }
}

export default BrandPage
