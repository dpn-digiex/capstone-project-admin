import { useRef, useState } from 'react'
import Loading from '@components/loading'
import TableComponent from '@components/table'
import useFetch from '@hooks/useFetch'
import { Checkbox } from '@mui/material'
import { getProductListService } from '@services/product-service'

import styles from './index.module.scss'

const ProductPage = () => {
  const { isLoading, response } = useFetch({
    queryFunction: () => getProductListService()
  })
  const [activePage, setActivePage] = useState(1)
  const [rowSelection, setRowSelection] = useState({})

  const columns = [
    {
      id: 'name',
      accessorFn: (row) => ({ name: row.name, image: row.mainImageUrl }),
      cell: ({ row, getValue }) => (
        <div className='flex items-center gap-1'>
          <Checkbox
            checked={row.getIsSelected()}
            onChange={(value) => row.toggleSelected(!!value)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <img src={getValue().image} alt={getValue().name} className='object-center object-cover w-28 h-28' />
          <span>{getValue().name}</span>
        </div>
      ),
      header: ({ column, table }) => (
        <div className='flex justify-start items-center py-[12px] gap-[12px]'>
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <span className='flex justify-start items-center py-[12px] pr-[24px]'>Product</span>
        </div>
      )
    },
    {
      id: 'model',
      accessorFn: (row) => row.model,
      cell: (info) => info.getValue(),
      header: () => <span className='flex justify-start items-center py-[12px] pr-[24px]'>Model</span>
    },
    {
      id: 'brand',
      accessorFn: (row) => row.brand,
      cell: (info) => info.getValue(),
      header: () => <span className='flex justify-start items-center py-[12px] pr-[24px]'>Thương hiệu</span>
    },
    {
      id: 'descriptions',
      accessorFn: (row) => row.descriptions || 'Chưa có mô tả...',
      cell: (info) => info.getValue(),
      header: () => <span className='flex justify-start items-center py-[12px] pr-[24px]'>Mô tả</span>
    }
  ]

  if (isLoading) return <Loading />

  return (
    <div id='product-page' className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h3 className={styles.title}>Sản phẩm</h3>
        <button type='button' className={styles.addBtn}>
          Add new
        </button>
      </div>
      <div>
        <TableComponent
          activePage={activePage}
          columns={columns}
          data={response.products}
          isLoading={isLoading}
          enablePrevPagination={!!true}
          enableNextPagination={!!true}
          totalItems={response?.totalItems}
          totalPages={response?.totalPages}
          rowSelection={rowSelection}
          setActivePage={setActivePage}
          onClickNext={() => setActivePage(activePage + 1)}
          onClickPrev={() => setActivePage(activePage - 1)}
          setRowSelection={setRowSelection}
        />
      </div>
    </div>
  )
}

export default ProductPage
