'use client'
import { useAuthContext } from '@/src/context/auth/auth-context'
import VehicleService from '@/src/services/VehicleService'
import CustomButton from '@/src/shared/ui/custom-button/custom-button'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function App() {
  const router = useRouter()
  const [vehicles, setVehicles] = useState([])
  const { getAuthToken } = useAuthContext()
  const loadVehicles = async () => {
    const { data } = await VehicleService.getAllVehicle(getAuthToken())
    setVehicles(data)
  }

  useEffect(() => {
    loadVehicles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])
  return (
    <>
      To add Vehicle Data,
      <CustomButton title="Click here" type="link" onClick={() => router.push('/vehicle/add')} />
      <div>Total Vehicle Records in database are: {vehicles?.length ?? 0}</div>
    </>
  )
}
