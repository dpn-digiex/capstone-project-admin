import React, { useState } from 'react'
import { MdOutlineReportProblem } from 'react-icons/md'
import { ValidationError } from '@utils/errors'
import { getType, validateInput } from '@utils/index'
import clsx from 'clsx'

import styles from './index.module.scss'

const FormClient = ({
  children,
  className,
  errorClassName,
  validate,
  defaultValidate = false,
  onSubmit,
  header,
  footer,
  compare = {},
  ...props
}) => {
  // [STATES]
  const [errorList, setErrorList] = useState(React.Children.map(children, () => ''))

  // [HANDLER FUNCTIONS]
  const handleValidateForm = (e) => {
    if (!validate) return true
    const newErrorList = Array.from(e.target).map((formControl) => {
      if (!formControl.required) return null
      const validateResult = validateInput(formControl, compare)
      if (getType(validateResult) === 'error') return validateResult.message
      return validateResult
    })
    setErrorList(newErrorList)
    if (newErrorList.length > 0) {
      if (newErrorList.every((error) => error === null)) return true
    }
    return false
  }

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault()
      const isValidate = handleValidateForm(e)
      if (!isValidate) throw new ValidationError('form-submit', 'Invalid form data')
      await onSubmit(e)
    } catch (error) {
      console.log(error.message)
    }
  }

  // [RENDER]
  return (
    <form
      autoComplete='off'
      noValidate={!defaultValidate}
      className={clsx(styles.form, className)}
      {...props}
      onSubmit={handleSubmitForm}
    >
      {header}
      {React.Children.map(children, (child, index) => (
        <div className={styles.inputGroups}>
          {React.cloneElement(child, {
            'data-invalid': !!errorList[index],
            validate,
            position: index,
            compare: compare,
            setErrorList: setErrorList
          })}
          {errorList[index] && (
            <span className={clsx(styles.errorMessage, errorClassName)}>
              <MdOutlineReportProblem size={16} className={styles.errorIcon} />
              {errorList[index]}
            </span>
          )}
        </div>
      ))}
      {footer}
    </form>
  )
}

export default FormClient
