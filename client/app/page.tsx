'use client'
import CustomButton from '@/src/shared/ui/custom-button/custom-button'
import { useRouter } from 'next/navigation'

export default function App() {
  const router = useRouter()
  return (
    <>
      To add Vehicle Data,
      <CustomButton title="Click here" type="link" onClick={() => router.push('/vehicle/add')} />
    </>
  )
}
