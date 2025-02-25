import Container from '@/components/container'
import Billboard from '@/app/components/billboard'
import GridBillboard from './components/grid-billboard'

export default function Home() {
  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard />
        <GridBillboard />
        <div className='p-20 flex flex-col items-center justify-center'>
          <h1 className=' text-4xl font-bold mb-4 text-red-600'>Flash Sale</h1>
        </div>
      </div>
    </Container>
  )
}
