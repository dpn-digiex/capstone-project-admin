import axiosInstance from './axiosClient'

export const getCategoryListService = async () => {
  try {
    const response = await axiosInstance.get('/product/category/list')
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}
