import { Metadata } from 'next'
import FaqInfo from './components/faq-info'
import { FAQ } from '@/types/ui.type'
import { getFAQs } from '@/actions/get-FAQs'
export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Danh sách sản phẩm của Productic, được tạo bởi Được dev'
}
export default async function FAQPage() {
  let data: FAQ[] = []

  try {
    data = await getFAQs()
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu FAQs:', error)
    data = []
  }

  return <FaqInfo data={data} />
}
