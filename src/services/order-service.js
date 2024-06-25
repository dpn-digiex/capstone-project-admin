import axiosInstance from './axiosClient'

export const createOrder = async (payload) => {
  try {
    const response = await axiosInstance.post('/order/add', payload)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
export const getOrderDetail = async (orderId) => {
  try {
    const response = await axiosInstance.get(`/order/${orderId}`)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getOrderList = async () => {
  try {
    const response = await axiosInstance.get(`/order/admin/get-all`)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

export const updateOrder = async (orderId, payload) => {
  try {
    const response = await axiosInstance.patch(`/order/admin/update/${orderId}`, payload)
    const { status, message } = response
    if (status !== 200) throw new Error(message)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
