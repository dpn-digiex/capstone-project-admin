import { createBrowserRouter } from 'react-router-dom'
import { ROUTES_APP } from '@constants'
import Dashboard from '@pages/Dashboard'
import HomePage from '@pages/home'
import OrderPage from '@pages/order'
import ProductPage from '@pages/product'

const router = createBrowserRouter([
  {
    id: 'private',
    path: '/',
    Component: Dashboard,
    children: [
      { path: '/', index: true, Component: HomePage },
      { path: 'orders', Component: OrderPage },
      { path: 'products', Component: ProductPage }
    ]
  }
])

export default router
