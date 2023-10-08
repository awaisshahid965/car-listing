import React, { ChangeEvent, useState } from 'react'
import FileUploadGrid from '@/src/components/file-upload-grid/file-upload-grid'
import addVehicleFormClasses from './add-vehicle-form.module.scss'
import CustomInput from '@/src/shared/ui/custom-input/custom-input'
import CustomButton from '@/src/shared/ui/custom-button/custom-button'
import VehicleService from '@/src/services/VehicleService'
import { uuid } from '@/src/shared/utils'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/src/context/auth/auth-context'

type FormDataType = Record<string, string | number | FormData | null | string[]>
const defaultFormDataState = {
  carModel: '',
  price: '',
  phoneNumber: '',
  maxPictures: '1',
  images: [],
}

const AddVehicleForm = () => {
  const [formData, setFormData] = useState<FormDataType>({ ...defaultFormDataState })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [maxFiles, setMaxFiles] = useState(1)
  const router = useRouter()
  const { getAuthToken } = useAuthContext()

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onUploadFile = (imagesUrlList: string[]) => {
    setFormData((prevState) => ({
      ...prevState,
      images: [...imagesUrlList],
    }))
  }

  const changeMaxImageFiles = () => {
    setMaxFiles(() => {
      return parseInt(formData.maxPictures as string) || 1
    })
  }

  const onSubmit = async () => {
    const { errors: dbErrors } = await VehicleService.addVehicle(
      {
        ...formData,
      },
      getAuthToken()
    )
    if (!!dbErrors && !Object.values(dbErrors).length) {
      return setErrors(dbErrors)
    }
    router.push('/')
  }

  const isFormValid = () => {
    const areFieldsValid = Object.values(formData).every((el) => !!el)
    const areAllImagesAdded = (formData.images as string[]).length === maxFiles
    return areAllImagesAdded && areFieldsValid
  }

  return (
    <div className={addVehicleFormClasses['add-vehicle-form']}>
      <h2>Add Vehicle</h2>
      <div className={addVehicleFormClasses['add-vehicle-form__form-wrapper']}>
        <CustomInput name="carModel" placeholder="Car Model" errorMessage={errors?.carModel} onChange={onInputChange} />
        <CustomInput
          name="price"
          type="number"
          placeholder="Price"
          errorMessage={errors?.price}
          onChange={onInputChange}
        />
        <CustomInput
          name="phoneNumber"
          placeholder="Phone Number"
          errorMessage={errors?.phoneNumber}
          onChange={onInputChange}
        />
        <div className={addVehicleFormClasses['add-vehicle-form__max_files']}>
          <CustomInput
            name="maxPictures"
            value={maxFiles}
            type="number"
            placeholder="No. of images needed"
            onChange={onInputChange}
          />
          <CustomButton title="Change Max Images" onClick={changeMaxImageFiles} />
        </div>
        <FileUploadGrid maxFiles={maxFiles} onUploadFile={onUploadFile} />
        <CustomButton title="Submit" type="primary" onClick={onSubmit} disabled={!isFormValid()} />
      </div>
    </div>
  )
}

export default AddVehicleForm

/*
carModel
price
phoneNumber
maxPictures
images
*/
