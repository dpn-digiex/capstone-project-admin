import React, { useId } from 'react'
import { validateInput } from '@utils/index'

import styles from './index.module.scss'

export default function Input({ children, validate, position, setErrorList, suffix, compare, ...props }) {
  // [STATES]
  const inputId = useId()

  // [HANDLER FUNCTIONS]
  function handleBlurInput(e) {
    if (!validate) return
    const validateResult = validateInput(e.target, compare)
    const errorMessage = validateResult ? validateResult.message : validateResult
    setErrorList((prev) => {
      prev.splice(position, 1, errorMessage)
      return [...prev]
    })
  }

  function handleFocusInput() {
    if (!validate) return
    setErrorList((prev) => {
      prev.splice(position, 1, '')
      return [...prev]
    })
  }

  // [RENDER]
  return (
    <div className={styles.inputField}>
      <label htmlFor={inputId} className={styles.iconContainer}>
        {React.cloneElement(children, { className: styles.icon })}
      </label>
      <input
        id={inputId}
        className={styles.input}
        {...props}
        aria-required='true'
        onBlur={handleBlurInput}
        onFocus={handleFocusInput}
      />
      {suffix}
    </div>
  )
}
