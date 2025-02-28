import { ShieldCheckIcon } from 'lucide-react'

interface Policy {
  id: number
  icon?: React.ReactNode
  text: string
}

const ProductPolicy = ({ policies }: { policies: Policy[] }) => {
  return (
    <div className='p-4 border rounded-lg shadow-md '>
      <h3 className='text-lg font-semibold mb-3 flex items-center'>
        <ShieldCheckIcon className='w-5 h-5 text-yellow-500 mr-2' />
        Chính sách dành cho sản phẩm
      </h3>
      <ul className='space-y-2'>
        {policies.map(policy => (
          <li key={policy.id} className='flex items-start space-x-2'>
            {policy.icon && <span className='text-yellow-500'>{policy.icon}</span>}
            <span>{policy.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductPolicy
