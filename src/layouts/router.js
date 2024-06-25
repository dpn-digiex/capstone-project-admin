import { createBrowserRouter } from 'react-router-dom'
import { ROUTES_APP } from '@constants'
import AddProductPage from '@pages/add-product'
import Dashboard from '@pages/Dashboard'
import HomePage from '@pages/home'
import LoginPage from '@pages/login'
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
      { path: 'products', Component: ProductPage },
      { path: 'products/add', Component: AddProductPage }
    ]
  },
  { id: 'public', path: '/login', Component: LoginPage }
])

export default router
