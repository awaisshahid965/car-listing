import React, { FC, PropsWithChildren, useState, useLayoutEffect, useRef, useEffect } from 'react'
import { authStateDefaultValues } from './auth-interface'
import { AuthProvider } from './auth-context'
import AuthService from '@/src/services/AuthService'
import { useRouter } from 'next/navigation'

const AuthContainer: FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState(authStateDefaultValues)
  const router = useRouter()

  const getAuthToken = () => localStorage.getItem('token') ?? ''

  const checkAuthOnLoad = async () => {
    const token = localStorage.getItem('token')
    const data = await AuthService.valiateUser(token ?? '')
    !data.isValidUser && router.push('/auth/login')
    setAuthState((prevState) => ({
      ...prevState,
      loading: false,
      isAuthenticated: data.isValidUser,
    }))
  }

  useLayoutEffect(() => {
    checkAuthOnLoad()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async (email: string, password: string) => {
    const { data, errors } = await AuthService.login({ email, password })
    if (!!data?.token) {
      localStorage.setItem('token', data.token)
      router.push('/')
    }
    setAuthState((prevState) => ({
      ...prevState,
      authErrors: errors,
    }))
  }

  if (authState.loading) {
    return null
  }
  return <AuthProvider value={{ ...authState, login, getAuthToken }}>{children}</AuthProvider>
}

export default AuthContainer
