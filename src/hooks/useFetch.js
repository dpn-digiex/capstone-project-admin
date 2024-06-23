import { useCallback, useEffect, useRef, useState } from 'react'
import { delayCallback, getCachedData, getType, hasData, setCachedData } from '@utils/index'

/**
 *
 * @param {{
 * 	queryKey: string,
 * 	queryFunction: () => Promise<any>,
 * 	initData: any,
 * 	fetchDelay: number
 * }} useFetchParams
 * @returns
 */
const useFetch = ({ queryFunction = () => {}, initData, queryKey = '', fetchDelay = 250 }) => {
  // [STATES]
  const [isLoading, setIsLoading] = useState(true)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [error, setError] = useState('')
  const [response, setResponse] = useState(initData)
  const rerenderRef = useRef(false)
  const callbackRef = useRef(queryFunction)

  // [HANDLERS]
  const handleFetchData = useCallback(
    async (...args) => {
      try {
        setIsLoading(true)
        const data = await delayCallback(() => callbackRef.current(...args), fetchDelay)
        if (rerenderRef.current === true) setIsFirstLoad(false)

        if (data === null || data === undefined) throw new Error(data.message)
        setResponse(data)
        setError(null)
        if (getType(queryKey) === 'string' && queryKey !== '') setCachedData(queryKey, data)
      } catch (error) {
        setError(error)
        setResponse(initData)
        if (getType(queryKey) === 'string' && queryKey !== '') setCachedData(queryKey, initData)
      } finally {
        setIsLoading(false)
      }
    },
    [initData, queryKey, fetchDelay]
  )
  const handleGetCacheData = useCallback(async () => {
    const cachedData = await getCachedData(queryKey)
    setResponse(cachedData)
    setIsFirstLoad(false)
    setIsLoading(false)
  }, [queryKey])

  // [SIDE EFFECTS]
  useEffect(() => {
    callbackRef.current = queryFunction
  }, [queryFunction])

  useEffect(() => {
    if (rerenderRef.current === false) {
      const isHasCached = hasData(queryKey)
      if (getType(queryKey) === 'string' && queryKey !== '' && isHasCached) {
        handleGetCacheData()
      } else {
        handleFetchData()
      }
    }
    return () => {
      rerenderRef.current = true
    }
  }, [handleFetchData, handleGetCacheData, queryKey])

  // [RETURNS]
  return {
    isLoading,
    error,
    response,
    refetch: handleFetchData,
    isFirstLoad
  }
}

export default useFetch
