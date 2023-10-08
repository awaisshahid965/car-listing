import React, { useEffect, useState } from 'react'
import { Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd/es/upload/interface'
import { antdUploadToCloudinary } from '@/src/shared/utils'

interface FileUploadGridProps {
  maxFiles: number
  onUploadFile?: (imagesArray: string[]) => void
}

const FileUploadGrid: React.FC<FileUploadGridProps> = ({ maxFiles, onUploadFile }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  useEffect(() => {
    const images = fileList.map(({ response }) => {
      return response?.url ?? ''
    })
    onUploadFile?.(images.filter((i) => !!i))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileList])

  return (
    <Upload
      customRequest={antdUploadToCloudinary}
      listType="picture-card"
      fileList={fileList}
      onChange={onChange}
      showUploadList={{
        showPreviewIcon: false,
      }}
    >
      {fileList.length < (maxFiles || 1) && '+ Upload'}
    </Upload>
  )
}

export default FileUploadGrid
