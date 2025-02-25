import Container from '@/components/layouts/container'
import Footer from '@/components/layouts/footer'
import { Divider } from '@heroui/react'

interface SupportsLayoutProps {
  children: React.ReactNode
}

export default function RoutesLayout({ children }: Readonly<SupportsLayoutProps>) {
  return (
    <Container>
      {children}
      <Divider />
      <Footer />
    </Container>
  )
}
