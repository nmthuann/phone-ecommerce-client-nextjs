import { Suspense } from 'react'
import NotFoundComponent from '@/components/errors/not-found-component'
import { ErrorComponent } from '@/components/errors/error-component'
import { Divider } from '@heroui/react'
import Footer from '@/components/layouts/footer'
import Loading from './loading'
import CategoryExplorer from './components/category-explorer'
import { getCategories } from '@/actions/get-categories'
import { getBrands } from '@/actions/get-brands'
import { getProducts } from '@/actions/get-products'

const CategoryPage = async ({ params }: { params: Promise<{ categoryUrl: string }> }) => {
  const { categoryUrl } = await params
  console.log('categoryUrl:::', categoryUrl)
  if (!categoryUrl) {
    return <NotFoundComponent />
  }
  try {
    const categories = await getCategories()
    const brands = await getBrands()
    const products = await getProducts(categoryUrl, 'apple', 1, 5)

    if (categories) {
      return (
        <div>
          <Suspense fallback={<Loading />}>
            <CategoryExplorer brands={brands} cats={categories} products={products} />
          </Suspense>
          <Divider />
          <Footer />
        </div>
      )
    } else {
      return (
        <ErrorComponent
          title='Category Page'
          message={`Failed to load Categories or Products. Not Found /${categoryUrl} . Please try again later.`}
        />
      )
    }
  } catch (error: unknown) {
    console.log(error)
    return (
      <ErrorComponent title='Category Page' message='Failed to load Categories or Products. Please try again later.' />
    )
  }
}

export default CategoryPage
