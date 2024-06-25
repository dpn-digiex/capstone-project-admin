import React from 'react'
import Loading from '@components/loading'
import useFetch from '@hooks/useFetch'
import { getOrderList } from '@services/order-service'

import styles from './index.module.scss'

const OrderPage = () => {
  const { isLoading, response } = useFetch({
    queryFunction: getOrderList
  })

  if (isLoading) return <Loading />
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h3 className={styles.title}>Đơn hàng</h3>
      </div>
      <div>{JSON.stringify(response)}</div>
    </div>
  )
}

export default OrderPage
