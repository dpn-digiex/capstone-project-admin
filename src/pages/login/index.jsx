import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { MdOutlineLock, MdOutlinePerson, MdOutlineVisibility, MdOutlineVisibilityOff } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import loginSVG from '@assets/images/login.svg'
import FormClient from '@components/form-client'
import Input from '@components/form-client/input'
import { useAppStore } from '@libs/zustand'
import { login } from '@services/user-service'
import clsx from 'clsx'

import styles from './index.module.scss'

const LoginPage = () => {
  // [STATES]
  const [showPassword, setShowPassword] = useState(false)
  const setAccessToken = useAppStore((state) => state.setAccessToken)
  const setUser = useAppStore((state) => state.setUser)
  const navigate = useNavigate()

  // [HANDLER FUNCTIONS]
  const handleLogin = async (e) => {
    try {
      const formData = new FormData(e.target)
      const payload = Object.fromEntries(formData)
      const result = await login(payload)
      if (result === false) throw new Error('Đăng nhập thất bại, vui lòng thử lại')
      setUser(result)
      setAccessToken(result.accessToken)
      navigate('/products')
    } catch (error) {
      toast.error(error.message)
    }
  }

  // [RENDER]
  return (
    <div className={clsx('scale-screen', styles.authentication)}>
      <div className={styles.formContainer}>
        <div className={styles.formSwitch}>
          <FormClient
            validate
            defaultValidate={false}
            onSubmit={handleLogin}
            className={clsx(styles.authForm, styles.signInForm)}
            header={<FormHeader />}
            footer={<FormFooter />}
          >
            <Input type='text' required name='username' placeholder='Tên đăng nhập*'>
              <MdOutlinePerson />
            </Input>
            <Input
              type={showPassword === true ? 'text' : 'password'}
              required
              placeholder='Mật khẩu*'
              name='password'
              suffix={<PasswordSuffix isShow={showPassword} setShow={setShowPassword} />}
            >
              <MdOutlineLock />
            </Input>
          </FormClient>
        </div>
      </div>
      <div className={styles.panelContainer}>
        <div className={clsx(styles.panel, styles.leftPanel)}>
          <div className={styles.content}>
            <h3 className={styles.greeting}>Chào mừng quay trở lại!</h3>
            <p className={styles.description}>Hành trình của bạn tiếp tục tại đây. Đăng nhập vào tài khoản của bạn.</p>
          </div>
          <img src={loginSVG} alt='Rocket SVG' className={styles.image} width={1140} height={788} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage

// [CUSTOM RENDERED COMPONENTS]
const FormHeader = () => {
  return <h2 className={styles.title}>Đăng nhập</h2>
}
const FormFooter = () => {
  return (
    <React.Fragment>
      <button type='submit' className={clsx('btn', 'btn-rounded', styles.solidBtn)}>
        Đăng nhập
      </button>
    </React.Fragment>
  )
}
const PasswordSuffix = ({ isShow = false, setShow }) => {
  if (isShow === true) return <MdOutlineVisibility onClick={() => setShow(false)} className='fill-[#acacac] text-2xl' />
  return <MdOutlineVisibilityOff onClick={() => setShow(true)} className='fill-[#acacac] text-2xl' />
}
