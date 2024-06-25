import React from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import Loading from '@components/loading'
import SelectBase from '@components/select'
import useFetch from '@hooks/useFetch'
import { getOrderDetail, updateOrder } from '@services/order-service'
import { concatString, formatCurrency } from '@utils/index'

import styles from './index.module.scss'

const OrderDetailPage = () => {
  const params = useParams()
  const { isLoading, response, refetch } = useFetch({
    queryFunction: () => getOrderDetail(params.orderId)
  })

  const handleUpdateStatus = async (status) => {
    try {
      const result = await updateOrder(params.orderId, { status: status.value })
      if (result !== true) throw new Error('Thất bại.')
      await refetch(params.orderId)
      toast.success('Cập nhật trạng thái thành công')
    } catch (error) {
      console.log(error)
      toast.error('Không thể cập nhật đơn hàng')
    }
  }

  if (isLoading) return <Loading />
  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h3 className={styles.title}>Chi tiết đơn hàng</h3>
        </div>
        <div className='flex flex-col gap-4'>
          <p className='font-bold'>Thông tin đơn hàng</p>
          <div className='grid gap-6 mb-6 md:grid-cols-2'>
            <div className=''>
              <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Tên khách hàng</span>
              <input
                type='text'
                className='bg-gray-50 outline-none border border-gray-300 text-gray-900/50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                placeholder='Tên khách hàng'
                readOnly
                defaultValue={response.customerName}
              />
            </div>
            <div className=''>
              <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Giới tính</span>
              <input
                type='text'
                className='bg-gray-50 outline-none border border-gray-300 text-gray-900/50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                placeholder='Giới tính'
                readOnly
                defaultValue={response.customerGender}
              />
            </div>
            <div className=''>
              <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</span>
              <input
                type='text'
                className='bg-gray-50 outline-none border border-gray-300 text-gray-900/50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                placeholder='Email'
                readOnly
                defaultValue={response.customerEmail}
              />
            </div>
            <div className=''>
              <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Số điện thoại</span>
              <input
                type='text'
                className='bg-gray-50 outline-none border border-gray-300 text-gray-900/50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                placeholder='Số điện thoại'
                readOnly
                defaultValue={response.customerPhone}
              />
            </div>
            <div className=''>
              <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Địa chỉ nhận hàng</span>
              <input
                type='text'
                className='bg-gray-50 outline-none border border-gray-300 text-gray-900/50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                placeholder='Địa chỉ nhận hàng'
                readOnly
                defaultValue={concatString(
                  response.delivery.detailAddress,
                  response.delivery.wardName,
                  response.delivery.districtName,
                  response.delivery.provinceName
                )}
              />
            </div>
            <div className=''>
              <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Ghi chú</span>
              <input
                type='text'
                className='bg-gray-50 outline-none border border-gray-300 text-gray-900/50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                placeholder='Ghi chú'
                readOnly
                defaultValue={response.note}
              />
            </div>
            <div className=''>
              <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Tổng tiền</span>
              <input
                type='text'
                className='bg-gray-50 outline-none border border-gray-300 text-gray-900/50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                placeholder='Tổng tiền'
                readOnly
                defaultValue={formatCurrency(
                  response.items?.reduce(
                    (total, product) => total + product.quantity * product.price * (1 - product.discount / 100),
                    0
                  ) + (response.delivery?.transferFee ?? 0)
                )}
              />
            </div>
            <div className=''>
              <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Phương thức thanh toán
              </span>
              <input
                type='text'
                className='bg-gray-50 outline-none border border-gray-300 text-gray-900/50 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                placeholder='Phương thức thanh toán'
                readOnly
                defaultValue={response.paymentMethod}
              />
            </div>
            <div>
              <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Trạng thái</span>
              <SelectBase
                name='category'
                className='text-sm'
                options={[
                  { span: 'Chờ xác nhận', value: 'pending' },
                  { span: 'Đã thanh toán', value: 'paid' },
                  { span: 'Đang xử lý', value: 'processing' },
                  { span: 'Đang giao hàng', value: 'shipping' },
                  { span: 'Đã nhận hàng', value: 'delivered' },
                  { span: 'Đã hoàn thành', value: 'completed' },
                  { span: 'Đã hủy', value: 'cancelled' }
                ]}
                defaultValue={response.status}
                renderKey='span'
                valueKey='value'
                onSelect={handleUpdateStatus}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <p className='font-bold'>Danh sách sản phẩm mua</p>
          <div className='p-2 rounded-md border border-solid border-slate-400 flex flex-col'>
            {response['items']?.map((item) => (
              <div key={'' + item._id + item.variantId + item.optionId} className='flex gap-2 py-2 peer peer-[]:border-t'>
                <img src={item.imageUrl} alt={item.productName} className='w-24' />
                <div className='flex flex-col gap-2'>
                  <span>
                    {item.productName} - {item.variantName}
                  </span>
                  <span>Màu: {item.color}</span>
                  <span>Số lượng: {item.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetailPage
