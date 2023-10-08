export const antdUploadToCloudinary = async (options: any) => {
  try {
    const formData = new FormData()
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME
    const API_ENDPOINT = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? ''
    formData.append('file', options.file as File)
    formData.append('upload_preset', uploadPreset)

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Uploaded successfully:', data.secure_url)
      options.onSuccess(data, options.file)
    } else {
      console.error('Upload failed:', response.statusText)
      options.onError(new Error('Upload failed'), options.file)
    }
  } catch (error) {
    console.error('Upload error:', error)
    options.onError(error, options.file)
  }
}

export const uuid = () => {
  var dt = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
  return uuid
}
