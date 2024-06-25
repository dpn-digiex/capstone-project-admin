import React from 'react'
import Loading from '@components/loading'
import useFetch from '@hooks/useFetch'
import {
  Avatar,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import { getOrderList } from '@services/order-service'
const statusColors = {
  paid: 'green',
  pending: 'orange',
  canceled: 'red',
  delivered: 'blue'
}
import styles from './index.module.scss'

const OrderPage = () => {
  const { isLoading, response } = useFetch({
    queryFunction: getOrderList
  })

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const calculateOrderValue = (items) => {
    return items.reduce((total, item) => {
      const itemValue = item.price * item.quantity - item.discount
      return total + itemValue
    }, 0)
  }

  if (isLoading) return <Loading />
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <h3 className={styles.title}>Đơn hàng</h3>
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell>Thứ tự</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>SDT</TableCell>
                <TableCell>Địa chỉ</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Thanh toán</TableCell>
                <TableCell>Ngày đặt</TableCell>
                <TableCell>Chi phí</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {response.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
                <TableRow key={order._id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.customerEmail}</TableCell>
                  <TableCell>{order.customerPhone}</TableCell>
                  <TableCell>
                    {order.delivery.detailAddress}, {order.delivery.wardName}, {order.delivery.districtName},{' '}
                    {order.delivery.provinceName}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      style={{ backgroundColor: statusColors[order.status], color: 'white' }}
                    />
                  </TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {calculateOrderValue(order.items).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={response.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default OrderPage
