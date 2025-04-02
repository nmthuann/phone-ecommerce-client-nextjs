import Container from '@/components/layouts/container'
import Footer from '@/components/layouts/footer'
import { Divider } from '@heroui/react'

interface AccountsLayoutProps {
  children: React.ReactNode
}

export default function AccountsLayout({ children }: Readonly<AccountsLayoutProps>) {
  return (
    <Container>
      {children}
      <Divider />
      <Footer />
    </Container>
  )
}
