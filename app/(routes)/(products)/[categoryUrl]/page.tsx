import { Divider } from '@heroui/react'
import CategoryExplorer from './components/category-explorer'
import Footer from '@/components/layouts/footer'
import { ErrorComponent } from '@/components/errors/error-component'
import NotFoundComponent from '@/components/errors/not-found-component'
import { getBrands } from '@/actions/get-brands'
import { getProducts } from '@/actions/get-products'
import { getCategoryByUrl } from '@/actions/get-category'

const CategoryPage = async ({ params }: { params: Promise<{ categoryUrl: string }> }) => {
  const { categoryUrl } = await params
  if (!categoryUrl) {
    return <NotFoundComponent />
  }

  try {
    const category = await getCategoryByUrl(categoryUrl)

    if (!category) {
      return <NotFoundComponent />
    }

    const brands = await getBrands()
    const products = await getProducts(categoryUrl, 'apple', 1, 5)

    return (
      <div>
        <CategoryExplorer brands={brands} category={category} products={products} />
        <Divider />
        <Footer />
      </div>
    )
  } catch (error: unknown) {
    console.error(error)
    return (
      <ErrorComponent title='Category Page' message='Failed to load Categories or Products. Please try again later.' />
    )
  }
}

export default CategoryPage
