'use client'
import { Attribute } from '@/types/products.type'
import { Card, CardBody, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import { TextSelect } from 'lucide-react'

interface ProductSpecsTableProps {
  productSpecs: Attribute[]
}

const ProductSpecsTable: React.FC<ProductSpecsTableProps> = ({ productSpecs }) => {
  return (
    <div>
      {productSpecs.length === 0 ? (
        <Card className='my-4 p-4 border '>
          <CardBody className='flex items-center justify-center space-x-2'>
            <TextSelect className='text-gray-500' size={24} />
            <p className='text-gray-600 font-semibold'>Không có thông tin thuộc tính sản phẩm</p>
          </CardBody>
        </Card>
      ) : (
        <Table isStriped aria-label='Product Specifications Table'>
          <TableHeader>
            <TableColumn>Tên cấu hình</TableColumn>
            <TableColumn>Thông tin cấu hình</TableColumn>
          </TableHeader>
          <TableBody>
            {productSpecs.map(specification => (
              <TableRow key={specification.key}>
                <TableCell>{specification.key}</TableCell>
                <TableCell>{String(specification.value)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default ProductSpecsTable
