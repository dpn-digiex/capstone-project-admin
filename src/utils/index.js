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