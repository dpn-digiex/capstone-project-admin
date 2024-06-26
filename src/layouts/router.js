import { createBrowserRouter } from 'react-router-dom'
import { ROUTES_APP } from '@constants'
import AddProductPage from '@pages/add-product'
import CustomerPage from '@pages/customer'
import CustomerDetailPage from '@pages/customer-detail'
import Dashboard from '@pages/Dashboard'
import HomePage from '@pages/home'
import LoginPage from '@pages/login'
import OrderPage from '@pages/order'
import OrderDetailPage from '@pages/order-detail'
import ProductPage from '@pages/product'
import ProductDetailPage from '@pages/product-detail'

const router = createBrowserRouter([
  {
    id: 'private',
    path: '/',
    Component: Dashboard,
    children: [
      { path: '/', index: true, Component: HomePage },
      { path: 'orders', Component: OrderPage },
      { path: 'orders/detail/:orderId', Component: OrderDetailPage },
      { path: 'products', Component: ProductPage },
      { path: 'products/add', Component: AddProductPage },
      { path: 'products/detail/:productId', Component: ProductDetailPage },
      { path: 'customers', Component: CustomerPage },
      { path: 'customers/detail/:userId', Component: CustomerDetailPage }
    ]
  },
  { id: 'public', path: '/login', Component: LoginPage }
])

export default router
