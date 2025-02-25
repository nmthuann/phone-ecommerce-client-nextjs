import Container from '@/components/layouts/container'

interface RoutesLayoutProps {
  children: React.ReactNode
}

export default function RoutesLayout({ children }: Readonly<RoutesLayoutProps>) {
  return <Container>{children}</Container>
}
