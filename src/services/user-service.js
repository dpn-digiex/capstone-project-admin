import { LOCAL_STORE_USER } from '@constants/index'
import { getLocalStore, setLocalStore } from '@utils/index'

import axiosInstance from './axiosClient'

export const register = async ({ username, password, fullName, email, phoneNumber }) => {
  try {
    const body = { username, password, fullName, email, phoneNumber }
    const response = await axiosInstance.post('/user/register', body)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message || 'Đăng ký thất bại, vui lòng thử lại')
    return data
  } catch (error) {
    console.log(error)
    return { status: 'error', message: 'Đăng ký thất bại, vui lòng thử lại' }
  }
}

export const login = async ({ username, password }) => {
  try {
    const response = await axiosInstance.post('/user/login', {
      username,
      password
    })
    const { status, message, data } = response
    if (status !== 200) throw new Error(message || 'Đăng nhập thất bại, vui lòng thử lại')
    setLocalStore('accessToken', data.accessToken)
    setLocalStore('user', data)
    axiosInstance.defaults.headers.common['x-access-token'] = data.accessToken
    return data
  } catch (error) {
    console.log(error)
    return false
  }
}

export const logout = async () => {
  try {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    window.location.href = '/login'
    await axiosInstance.post('/user/logout')
    delete axiosInstance.defaults.headers.common['x-access-token']
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const refreshToken = async () => {
  try {
    const response = await axiosInstance.post('/user/refresh-token')
    const { status, data } = response
    if (status !== 200) {
      await logout()
      window.location.href = '/dang-nhap'
      return false
    }
    setLocalStore('accessToken', data.accessToken)
    axiosInstance.defaults.headers.common['x-access-token'] = data.accessToken
    return true
  } catch (error) {
    console.log(error)
    await logout()
    window.location.href = '/dang-nhap'
    return false
  }
}

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get('/user/profile')
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    setLocalStore(LOCAL_STORE_USER, data)
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateProfile = async (payload) => {
  try {
    const response = await axiosInstance.patch('/user/profile/update', payload)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    setLocalStore(LOCAL_STORE_USER, data)
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const updateAvatar = async (formData) => {
  try {
    const response = await axiosInstance.put('/user/profile/update-avatar', formData)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)

    const localStoreUser = getLocalStore(LOCAL_STORE_USER) ?? {}

    if (data?.avatar) {
      setLocalStore(LOCAL_STORE_USER, {
        ...localStoreUser,
        avatar: data.avatar
      })
    }
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const changePassword = async (payload) => {
  try {
    const response = await axiosInstance.post('/user/update-password', payload)
    const { status, message } = response
    if (status !== 200) throw new Error(message)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
export const getUserDetail = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getUserList = async () => {
  try {
    const response = await axiosInstance.get(`/user/list`)
    const { status, message, data } = response
    if (status !== 200) throw new Error(message)
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}
