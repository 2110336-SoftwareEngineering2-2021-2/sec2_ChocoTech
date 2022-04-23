import { IconButton, Stack, TextField } from '@mui/material'
import { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiPlus, FiSend } from 'react-icons/fi'
import { useMutation } from 'react-query'

import { httpClient } from '@frontend/services'

import { SocketClientEvent, SocketClientPayload } from '@libs/api'

import { ChatMessage } from '../ChatMessage'

interface ChatPacelCardProps {
  roomId: string
  initialMessages: string
}

interface FormModel {
  fileUrl: string
  message: string
}

const uploadFile = async (file: File): Promise<string> => {
  // TODO: Complete upload file API @poravee

  // const form = new FormData()
  // form.append('file', file)
  // const { data } = httpClient.post<Type>('/chat/upload', form, {
  //   headers: { 'Content-Type': 'multipart/form-data' },
  // })
  // return data.url

  // Mock Data
  return 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
}

export const ChatPanel = (props: ChatPacelCardProps) => {
  const messages = useState<SocketClientPayload[SocketClientEvent.CHAT_MESSAGE][]>([])

  const uploadButtonRef = useRef<HTMLInputElement>(null)
  const { register, handleSubmit, setValue, reset } = useForm<FormModel>()

  const uploadFileMutation = useMutation('/chat/upload', uploadFile)

  const onSubmit: SubmitHandler<FormModel> = (data) => {
    const { fileUrl, message } = data

    if (!fileUrl && !message) return

    reset()
  }

  const handleUploadFile: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    event.preventDefault()

    const uploadFile = async (file: File) => {
      const url = await uploadFileMutation.mutateAsync(file)
      setValue('fileUrl', url)
    }

    toast.promise(uploadFile(event.target.files[0]), {
      loading: 'uploading...',
      success: 'upload file success',
      error: 'upload file failed',
    })
  }

  return (
    <Stack p={4} width="100%">
      <Stack
        spacing={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        direction="row"
        width="100%"
        alignItems="center"
        noValidate
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} {...message} />
        ))}
        <IconButton color="primary" onClick={() => uploadButtonRef?.current?.click()}>
          <FiPlus />
        </IconButton>
        <input
          type="file"
          accept="image/*"
          ref={uploadButtonRef}
          onChange={handleUploadFile}
          style={{ display: 'none' }}
        />
        <TextField size="small" placeholder="Type message" fullWidth {...register('message')} />
        <IconButton color="primary" type="submit">
          <FiSend />
        </IconButton>
      </Stack>
    </Stack>
  )
}
