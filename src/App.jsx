import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import router from './layouts/router'

const App = () => {
  useEffect(() => {
    document.body.classList.add('custom-scrollbar')
    return () => {
      document.body.classList.remove('custom-scrollbar')
    }
  }, [])

  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
}

export default App
