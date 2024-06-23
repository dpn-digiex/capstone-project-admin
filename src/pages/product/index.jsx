import { useRef } from 'react'
import Loading from '@components/loading'
import Table from '@components/table'
import useFetch from '@hooks/useFetch'
import { getProductListService } from '@services/product-service'

import styles from './index.module.scss'

const ProductPage = () => {
  const { isLoading, response } = useFetch({
    queryFunction: () => getProductListService()
  })
  const columnRef = useRef([
    {
      id: 'name',
      accessorFn: (row) => ({ name: row.name, image: row.mainImageUrl }),
      cell: (info) => (
        <div className='flex items-center gap-2'>
          <img
            src={info.getValue().image}
            alt={info.getValue().name}
            className='object-center object-cover w-28 h-28'
          />
          <span>{info.getValue().name}</span>
        </div>
      ),
      header: () => <span>Product</span>
    },
    {
      id: 'model',
      accessorFn: (row) => row.model,
      cell: (info) => info.getValue(),
      header: () => <span>Model</span>
    },
    {
      id: 'brand',
      accessorFn: (row) => row.brand,
      cell: (info) => info.getValue(),
      header: () => <span>Brand</span>
    },
    {
      id: 'descriptions',
      accessorFn: (row) => row.descriptions || 'Chưa có mô tả...',
      cell: (info) => info.getValue(),
      header: () => <span>Mô tả</span>
    }
  ])
  if (isLoading) return <Loading />
  return (
    <div id='product-page' className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h3 className={styles.title}>Products</h3>
        <button type='button' className={styles.addBtn}>
          Add new
        </button>
      </div>
      <div>
        <Table columns={columnRef.current} data={response.products} />
      </div>
    </div>
  )
}

export default ProductPage
