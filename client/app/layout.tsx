"use client"
import './globals.css'
import { Nunito_Sans } from 'next/font/google'
import StyledComponentsRegistry from '../lib/AntdRegistry'
import { ConfigProvider } from 'antd'
import AuthContainer from '@/src/context/auth/auth-container'

const nunito = Nunito_Sans({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <StyledComponentsRegistry>
          <ConfigProvider>
            <AuthContainer>{children}</AuthContainer>
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
