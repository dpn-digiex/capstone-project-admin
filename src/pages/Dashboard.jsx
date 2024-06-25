import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaBars, FaBox, FaHome, FaShoppingCart, FaUsers } from 'react-icons/fa'
import { MdExitToApp } from 'react-icons/md'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAppStore } from '@libs/zustand'
import { logout } from '@services/user-service'

import styles from './Dashboard.module.scss'

const DASHBOARD_ITEMS = [
  { icon: <FaHome />, title: 'Tổng quan', link: '/' },
  { icon: <FaShoppingCart />, title: 'Đơn hàng', link: '/orders' },
  { icon: <FaBox />, title: 'Sản phẩm', link: '/products' },
  { icon: <FaUsers />, title: 'Khách hàng', link: '/customers' }
]

const Dashboard = () => {
  const accessToken = useAppStore((state) => state.accessToken)
  const setAccessToken = useAppStore((state) => state.setAccessToken)
  const [open, setOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setOpen(!open)
  }
  const handleLogout = async () => {
    try {
      const result = await logout()
      if (result === false) throw new Error('Không thể đăng xuất, vui lòng thử lại')
      setAccessToken(null)
      navigate('/login')
      toast.success('Đăng xuất thành công')
    } catch (error) {
      toast.error(error.message)
    }
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

      <div className={styles.mainDashboard}>
        <header className={styles.header}>
          <h1 className={styles.title}>Quản lý cửa hàng</h1>
          <div className={styles.headerIcons}>
            <span>🔔</span>
            <NavLink
              to='/login'
              onClick={(e) => {
                if (accessToken) e.preventDefault()
              }}
            >
              👤
            </NavLink>
            {accessToken ? (
              <div onClick={handleLogout} className='cursor-pointer'>
                <MdExitToApp size={24} />
              </div>
            ) : null}
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
