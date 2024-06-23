import { useState } from 'react'
import {
  FaBars,
  FaBox,
  FaDollarSign,
  FaHome,
  FaShoppingCart,
  FaTags,
  FaThList,
  FaUserCog,
  FaUsers
} from 'react-icons/fa'
import { Link, Outlet, useLocation } from 'react-router-dom'

import styles from './Dashboard.module.scss'

const DASHBOARD_ITEMS = [
  { icon: <FaHome />, title: 'Tổng quan', link: '/' },
  { icon: <FaShoppingCart />, title: 'Đơn hàng', link: '/orders' },
  { icon: <FaBox />, title: 'Sản phẩm', link: '/products' },
  { icon: <FaUsers />, title: 'Nhân viên', link: '/staff' },
  { icon: <FaUsers />, title: 'Khách hàng', link: '/customers' },
  { icon: <FaTags />, title: 'Coupon Code', link: '/coupon-code' },
  { icon: <FaTags />, title: 'Vận chuyển', link: '/delivery' },
  { icon: <FaThList />, title: 'Categories', link: '/categories' },
  { icon: <FaDollarSign />, title: 'Transaction', link: '/transactions' },
  { icon: <FaDollarSign />, title: 'Blogs', link: '/blogs' },
  { icon: <FaUserCog />, title: 'Sự kiện', link: '/events' },
  { icon: <FaUserCog />, title: 'Tài khoản', link: '/admin-permissions' },
  { icon: <FaUserCog />, title: 'Cài đặt', link: '/settings' }
]

const Dashboard = () => {
  const [open, setOpen] = useState(true)
  const location = useLocation()

  const handleDrawerToggle = () => {
    setOpen(!open)
  }

  return (
    <div className={styles.dashboard}>
      <div className={`${styles.sidebar} ${open ? styles.open : styles.closed}`}>
        <button onClick={handleDrawerToggle} className={styles.toggleButton}>
          {open && (
            <img
              src='https://res.cloudinary.com/dgynzitgy/image/upload/v1718315464/capstone-project-cloud/panel/ectqc4orqpxn9x3fvizd.png'
              alt='logo-text'
              width={150}
              height={40}
            />
          )}
          <div className='p-[10px]'>
            <FaBars />
          </div>
        </button>
        <div className={styles.menuList}>
          {DASHBOARD_ITEMS.map((item, index) => (
            <Link key={index} to={item.link}>
              <div className={`${styles.menuItem} ${location.pathname === item.link ? styles.active : ''}`}>
                <div className={styles.menuIcon}>{item.icon}</div>
                <span className={styles.menuText}>{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.title}>Quản lý cửa hàng</h1>
          <div className={styles.headerIcons}>
            <span>🔔</span>
            <span>👤</span>
          </div>
        </header>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
