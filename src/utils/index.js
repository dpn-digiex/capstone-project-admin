import { ValidationError } from './errors'

export const formatCurrency = (price) => {
  if (getType(price) !== 'number' || isNaN(price)) return 'Giá đang cập nhật...'
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price)
}

export const getType = (value) => {
  const typeString = Object.prototype.toString.call(value).slice(8, -1)
  return typeString.toLowerCase()
}

export const setLocalStore = (key, value) => {
  const stringifiedValue = JSON.stringify(value ?? null)
  localStorage.setItem(key, stringifiedValue)
}

export const getLocalStore = (key) => {
  try {
    const localValue = localStorage.getItem(key)
    const value = JSON.parse(localValue ?? null)
    return value
  } catch (error) {
    return null
  }
}

export const getQueryString = (options = {}) => {
  const optionsType = getType(options)
  if (optionsType !== 'object') return ''
  const optionKeys = Object.keys(options)
  const queryString = optionKeys
    ?.reduce((previous, current) => (options[current] ? previous + `${current}=${options[current]}&` : previous), '')
    .slice(0, -1)
  return queryString
}
export const delayCallback = (callback, timeout = 500) => {
  return new Promise((resolve) =>
    setTimeout(async () => {
      const data = await callback()
      resolve(data)
    }, timeout)
  )
}

const cachedMap = new Map()

export const hasData = (key) => {
  return cachedMap.has(key)
}
export const setCachedData = (key, data) => {
  if (key !== null || key !== undefined) cachedMap.set(key, data)
}
export const getCachedData = (key) => {
  if (this.hasData(key)) return delayCallback(() => cachedMap.get(key), 250)
  return null
}

export const validateInput = (input, compare = {}) => {
  if (input.value === '') return new ValidationError(input.name, 'Vui lòng nhập vào trường này!')
  switch (input.dataset.validateType) {
    case 'email': {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!pattern.test(input.value)) return new ValidationError(input.name, 'Email không đúng định dạng!')
      break
    }
    case 'password': {
      const lowerCaseTest = /(?=.*[a-z])/.test(input.value)
      const upperCaseTest = /(?=.*[A-Z])/.test(input.value)
      const digitTest = /(?=.*\d)/.test(input.value)
      const specialTest = /(?=.*[#$@!%&*?])/.test(input.value)

      if (!lowerCaseTest) {
        return new ValidationError(input.name, 'Mật khẩu phải chứa ít nhất 1 ký tự chữ cái in thường')
      }
      if (!upperCaseTest) {
        return new ValidationError(input.name, 'Mật khẩu phải chứa ít nhất 1 ký tự chữ cái in hoa')
      }
      if (!digitTest) {
        return new ValidationError(input.name, 'Mật khẩu phải chứa ít nhất 1 ký tự số')
      }
      if (!specialTest) {
        return new ValidationError(input.name, 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt')
      }
      if (input.value.length < 8) {
        return new ValidationError(input.name, 'Mật khẩu phải chứa tối thiểu 8 ký tự')
      }
      if (input.value.length > 30) {
        return new ValidationError(input.name, 'Mật khẩu phải chứa tối đa 30 ký tự')
      }
      break
    }
    case 'confirm-password': {
      if (input.value !== compare.password) return new ValidationError(input.name, 'Mật khẩu không trùng khớp')
      break
    }
    default:
      return null
  }
  return null
}
export const concatString = (...data) => {
  const address = data.reduce((result, item) => (item ? result.concat(item) : result), [])
  return address.join(', ')
}
export const formatDateInputValue = (value) => {
  if (!value) return ''
  const date = new Date(value)
  const year = date.getFullYear()
  let month = (date.getMonth() + 1).toString()
  let day = date.getDate().toString()
  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day
  return [year, month, day].join('-')
}
