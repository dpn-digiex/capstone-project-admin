import { RouterProvider } from 'react-router-dom'

import router from './layouts/router'

const App = () => {
  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
}

export default App
