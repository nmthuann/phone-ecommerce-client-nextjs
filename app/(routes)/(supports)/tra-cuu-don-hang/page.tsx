import { Metadata } from 'next'
import SearchOrderForm from './components/search-order'

export const metadata: Metadata = {
  title: 'Về chúng tôi',
  description: 'Danh sách sản phẩm của Productic, được tạo bởi Được dev'
}

export default function OrderSearchPage() {
  return <SearchOrderForm />
}
