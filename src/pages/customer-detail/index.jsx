import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '@components/loading'
import useFetch from '@hooks/useFetch'
import { getUserDetail } from '@services/user-service'
import { formatDateInputValue } from '@utils/index'

import styles from './index.module.scss'
const CustomerDetailPage = () => {
  const params = useParams()
  const { isLoading, response } = useFetch({ queryFunction: () => getUserDetail(params.userId) })

  if (isLoading) return <Loading />
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h3 className={styles.title}>Thông tin khách hàng</h3>
        </div>
        <div className='flex items-center justify-center mb-6'>
          <img src={response.avatar} alt={response.username} className='w-36 h-36 border-4 rounded-full object-cover object-center' />
        </div>
        <div className='grid gap-6 mb-6 md:grid-cols-2'>
          <div className=''>
            <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Tên khách hàng</span>
            <input
              type='text'
              className='bg-gray-50 outline-none border border-gray-300 text-gray-900/50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              readOnly
              defaultValue={response.fullName}
            />
          </div>
          <div className=''>
            <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Giới tính</span>
            <input
              type='text'
              className='bg-gray-50 outline-none border border-gray-300 text-gray-900/50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              readOnly
              defaultValue={response.gender}
            />
          </div>
          <div className=''>
            <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</span>
            <input
              type='text'
              className='bg-gray-50 outline-none border border-gray-300 text-gray-900/50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              readOnly
              defaultValue={response.email}
            />
          </div>
          <div className=''>
            <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Số điện thoại</span>
            <input
              type='text'
              className='bg-gray-50 outline-none border border-gray-300 text-gray-900/50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              readOnly
              defaultValue={response.phoneNumber}
            />
          </div>
          <div className=''>
            <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Ngày sinh</span>
            <input
              type='text'
              className='bg-gray-50 outline-none border border-gray-300 text-gray-900/50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              readOnly
              defaultValue={formatDateInputValue(response.dateOfBirth)}
            />
          </div>
          <div className=''>
            <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Địa chỉ</span>
            <input
              type='text'
              className='bg-gray-50 outline-none border border-gray-300 text-gray-900/50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
              readOnly
              defaultValue={response.address}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerDetailPage
