import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import LoginPage from '@pages/login'

const PrivateLayout = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)

  return !isSignedIn ? (
    <LoginPage />
  ) : (
    <>
      <Outlet />
    </>
  )
}

export default PrivateLayout
