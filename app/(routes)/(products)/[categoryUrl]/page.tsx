import { Suspense } from 'react'
import NotFoundComponent from '@/components/errors/not-found-component'
import { ErrorComponent } from '@/components/errors/error-component'
import { Divider } from '@heroui/react'
import Footer from '@/components/layouts/footer'
import Loading from './loading'
import CategoryExplorer from './components/category-explorer'
import { getCategories } from '@/actions/get-categories'
import { getBrands } from '@/actions/get-brands'

const CategoryPage = async ({ params }: { params: Promise<{ categoryUrl: string }> }) => {
  const { categoryUrl } = await params

  if (!categoryUrl) {
    return <NotFoundComponent />
  }
  try {
    const categories = await getCategories()
    const brands = await getBrands()
    // const findCategory = categories.find(cat => cat.categoryUrl === `/${categoryUrl}`)

    // let productCards: ProductResponse[] = []
    if (categoryUrl) {
      //productCards = await getProductsByCategory(findCategory.categoryName)
      return (
        <div>
          <Suspense fallback={<Loading />}>
            <CategoryExplorer brands={brands} cats={categories} />
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
