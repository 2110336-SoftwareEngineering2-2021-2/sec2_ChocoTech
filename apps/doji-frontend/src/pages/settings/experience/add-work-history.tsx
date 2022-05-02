import { Box, Button, Input, Stack, TextField, Typography, styled } from '@mui/material'
import Image from 'next/image'
import router from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlineCamera } from 'react-icons/ai'
import { useMutation } from 'react-query'

import { getServerSideUser } from '@frontend/common/auth'
import { httpClient } from '@frontend/services'

import { IMeResponseDTO } from '@libs/api'

interface SettingsPageProps {
  user: IMeResponseDTO
}

type AddWorkHistoryModel = {
  topic: string
  description: string
  expert: string
  fileList: FileList
}

const ContainerBox = styled('div')`
  position: relative;
  width: fit-content;
  height: fit-content;
  background-color: aqua;
`

const Overlay = styled('label')<{ editable?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: 0.5s ease;
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
  border-radius: 100px;
  &:hover {
    opacity: ${({ editable }) => (editable ? 1 : 0)};
  }
`

const toBase64 = (file): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

const Index: React.FC<SettingsPageProps> = ({ user }) => {
  const { register, handleSubmit, control } = useForm<AddWorkHistoryModel>()
  const fileList = useWatch({ name: 'fileList', control })
  const [uploadedImage, setUploadedImage] = useState<string | undefined>()
  useEffect(() => {
    const tmp = async () => {
      if (typeof window !== undefined && fileList?.length > 0) {
        const url = await toBase64(fileList[0])
        setUploadedImage(url)
      } else {
        setUploadedImage(undefined)
      }
    }
    tmp()
  }, [fileList])
  const onError: SubmitErrorHandler<AddWorkHistoryModel> = (errors) => {
    const errMsg = Object.values(errors)
      .map((err) => err.message)
      .join(', ')
    toast.error(errMsg)
  }
  const onSubmit: SubmitHandler<AddWorkHistoryModel> = async (data) => {
    const form = new FormData()
    form.append('topic', data.topic)
    form.append('description', data.description)
    form.append('file', data.fileList[0])
    console.log(data)
    try {
      await toast.promise(
        httpClient.post('/expert/work/histories', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
        {
          loading: 'Loading...',
          success: 'Update your profile successful.',
          error: 'An error occur',
        },
      )
      router.push('/settings/experience')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Stack direction="column" spacing={1}>
        <Typography variant="title3" mt={4}>
          Add Experience
        </Typography>

        <Box width="maxWidth" height={300} bgcolor="sky.light" borderRadius={1}>
          <ContainerBox>
            <Overlay htmlFor="profile" editable>
              <AiOutlineCamera style={{ color: 'white' }} />
            </Overlay>
          </ContainerBox>

          {uploadedImage && <Image src={uploadedImage} alt="" width={550} height={300} />}

          <Input {...register('fileList', { required: 'File require' })} type="file" />
        </Box>

        <Typography variant="regular" fontWeight={500} pt={1}>
          Title
        </Typography>
        <TextField {...register('topic', { required: 'Topic require' })} />

        <Typography variant="regular" fontWeight={500} pt={1}>
          Description
        </Typography>
        <TextField {...register('description', { required: 'Description require' })} />

        <Button variant="contained" style={{ marginTop: '24px' }} type="submit">
          Add Experience
        </Button>
      </Stack>
    </form>
  )
}

export default Index

export const getServerSideProps = getServerSideUser()
