import { GiftIcon } from 'lucide-react'

interface Offer {
  id: number
  icon?: React.ReactNode
  text: string
}

const OffersList = ({ offers }: { offers: Offer[] }) => {
  return (
    <div className='p-4 border rounded-lg shadow-md'>
      <h3 className='text-lg font-semibold mb-3 flex items-center'>
        <GiftIcon className='w-5 h-5 text-red-500 mr-2' />
        Quà tặng và ưu đãi
      </h3>
      <ul className='space-y-2'>
        {offers.map(offer => (
          <li key={offer.id} className='flex items-start space-x-2'>
            {offer.icon && <span className='text-red-500'>{offer.icon}</span>}
            <span>{offer.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OffersList
