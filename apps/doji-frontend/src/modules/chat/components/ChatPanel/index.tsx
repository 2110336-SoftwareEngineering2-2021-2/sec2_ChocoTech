import { useTheme } from '@mui/material'
import { CircularProgress, IconButton, Stack, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiPlus, FiSend } from 'react-icons/fi'
import { useMutation } from 'react-query'

import { useChatRoomStore } from '@frontend/modules/chat/store'
import { httpClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'

import { IGetChatRoomResponseDTO } from '@libs/api'

import { ChatMessage } from '../ChatMessage'
import { ImagePreview } from './styled'

interface ChatPacelCardProps extends IGetChatRoomResponseDTO {
  isLoading?: boolean
  isEmpty?: boolean
}

interface FormModel {
  fileId: string
  fileUrl: string
  message: string
}

const uploadFile = async (file: File): Promise<{ id: string; url: string }> => {
  const form = new FormData()
  form.append('file', file)
  const { data } = await httpClient.post<{ id: string; url: string }>('/chat/image', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

const deleteFile = async (fileId: string): Promise<void> => {
  // TODO: Complete delete file API @poravee
  return
}

export const ChatPanel = ({ name, id: roomId, isLoading, isEmpty }: ChatPacelCardProps) => {
  /**
   * Setup related
   */
  const theme = useTheme()
  const user = useAuthStore((store) => store.user)
  const sendMessage = useChatRoomStore((store) => store.sendMessage)

  /**
   * Message Related
   */
  const messagesEndRef = useRef(null)
  const messages = useChatRoomStore((store) => store.messages[roomId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  /**
   * Form related
   */
  const uploadButtonRef = useRef<HTMLInputElement>(null)
  const { register, handleSubmit, setValue, reset: formReset, control } = useForm<FormModel>()
  const fileId = useWatch({ name: 'fileId', control })
  const fileUrl = useWatch({ name: 'fileUrl', control })

  const uploadFileMutation = useMutation('/chat/image', uploadFile, {
    onSuccess: ({ id, url }) => {
      setValue('fileUrl', url)
      setValue('fileId', id)
    },
  })

  const deleteFileMutation = useMutation('/chat/image', deleteFile, {
    onSuccess: () => {
      setValue('fileUrl', '')
      setValue('fileId', '')
      uploadButtonRef.current.value = ''
    },
  })

  const handleDeleteFile = async (fileId: string) => {
    toast.promise(
      deleteFileMutation.mutateAsync(fileId),
      {
        loading: 'deleting...',
        success: 'delete file success',
        error: 'delete file failed',
      },
      { position: 'top-center' },
    )
  }

  const handleUploadFile: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    event.preventDefault()
    toast.promise(
      uploadFileMutation.mutateAsync(event.target.files[0]),
      {
        loading: 'uploading...',
        success: 'upload file success',
        error: 'upload file failed',
      },
      { position: 'top-center' },
    )
  }

  const onSubmit: SubmitHandler<FormModel> = (data) => {
    const { fileUrl, message } = data

    if (!fileUrl && !message) return

    sendMessage(roomId, { message, imageUrl: fileUrl })

    formReset()
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    formReset()
  }, [roomId, formReset])

  if (isLoading) {
    return (
      <Stack p={4} width="100%" flexGrow={1} alignItems="center" justifyContent="center">
        <CircularProgress />
      </Stack>
    )
  }

  if (isEmpty) {
    return (
      <Stack p={4} width="100%" flexGrow={1} alignItems="center" justifyContent="center">
        <Typography variant="title3">No Chat Room</Typography>
      </Stack>
    )
  }

  return (
    <Stack width="100%" maxHeight="100%">
      <Typography
        variant="title3"
        px={4}
        py={2}
        borderBottom={`1px ${theme.palette.sky.main} solid`}
      >
        {name}
      </Typography>
      <Stack flexGrow={1} sx={{ overflowY: 'auto' }} p={4}>
        <Stack spacing={2} alignItems="">
          {messages?.map((msg) => (
            <ChatMessage key={msg.id} {...msg} owner={user.username === msg.author.username} />
          ))}
          <div ref={messagesEndRef} />
        </Stack>
      </Stack>
      <Stack
        px={4}
        pb={4}
        mt={2}
        spacing={2}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        direction="row"
        width="100%"
        alignItems="center"
        noValidate
      >
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
      {fileUrl && (
        <ImagePreview onClick={() => handleDeleteFile(fileId)}>
          <div className="cross" />
          <Image width="100" height="100" src={fileUrl} alt={fileUrl} />
        </ImagePreview>
      )}
    </Stack>
  )
}
