import React from 'react'
import Loading from '@components/loading'
import useFetch from '@hooks/useFetch'
import { getUserList } from '@services/user-service'

import styles from './index.module.scss'

const CustomerPage = () => {
  const { isLoading, response } = useFetch({
    queryFunction: getUserList
  })

  if (isLoading) return <Loading />
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h3 className={styles.title}>Khách hàng</h3>
      </div>
      <div>{JSON.stringify(response)}</div>
    </div>
  )
}

export default CustomerPage
