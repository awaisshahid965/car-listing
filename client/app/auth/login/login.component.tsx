import React, { ChangeEvent, useState } from 'react'
import styleClasses from './login.module.scss'
import CustomButton from '@/src/shared/ui/custom-button/custom-button'
import CustomInput from '@/src/shared/ui/custom-input/custom-input'
import { useAuthContext } from '@/src/context/auth/auth-context'

const Login = () => {
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { authErrors, login } = useAuthContext()
  const emailErrorMessage = authErrors?.email ?? authErrors?.form ?? ''
  const passwordErrorMessage = authErrors?.password ?? ''

  const onLoginButtonClick = async () => {
    setSubmitting(true)
    const { email, password } = formData
    await login(email, password)
    setSubmitting(false)
  }

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  return (
    <div className={styleClasses['login']}>
      <div className={styleClasses['login__wrapper']}>
        <h2>Sign In</h2>
        <div className={styleClasses['login__form']}>
          <CustomInput
            label="Email"
            name="email"
            placeholder="Email"
            errorMessage={emailErrorMessage}
            onChange={onInputChange}
          />
          <CustomInput
            label="Password"
            type="password"
            name="password"
            placeholder="Password"
            errorMessage={passwordErrorMessage}
            onChange={onInputChange}
          />
          <CustomButton
            title="Sign In"
            classNames={styleClasses['login__button']}
            type="primary"
            size="large"
            disabled={submitting}
            onClick={onLoginButtonClick}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
