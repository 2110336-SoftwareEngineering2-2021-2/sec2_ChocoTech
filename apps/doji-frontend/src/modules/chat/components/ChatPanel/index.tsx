import { useTheme } from '@mui/material'
import { CircularProgress, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiPlus, FiSend } from 'react-icons/fi'
import { useMutation } from 'react-query'

import { useChatRoomStore } from '@frontend/modules/chat/store'
import { useAuthStore } from '@frontend/stores'

import { IGetChatRoomResponseDTO, IMessageDTO } from '@libs/api'

import { ChatMessage } from '../ChatMessage'

interface ChatPacelCardProps extends IGetChatRoomResponseDTO {
  isLoading?: boolean
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

export const ChatPanel = ({
  name,
  id: roomId,
  messages: initialMessages,
  isLoading,
}: ChatPacelCardProps) => {
  /**
   * Setup related
   */
  const theme = useTheme()
  const user = useAuthStore((store) => store.user)
  const getSocketController = useChatRoomStore((store) => store.getSocketController)

  const socketController = useMemo(() => {
    return getSocketController(roomId)
  }, [getSocketController, roomId])

  /**
   * Message Related
   */
  const messagesEndRef = useRef(null)
  const [messages, setMessages] = useState<IMessageDTO[]>(initialMessages || [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    setMessages(initialMessages || [])
  }, [initialMessages])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  /**
   * Form related
   */
  const uploadButtonRef = useRef<HTMLInputElement>(null)
  const { register, handleSubmit, setValue, reset: formReset } = useForm<FormModel>()

  const uploadFileMutation = useMutation('/chat/upload', uploadFile)

  const onSubmit: SubmitHandler<FormModel> = (data) => {
    const { fileUrl, message } = data

    if (!fileUrl && !message) return

    socketController.sendMessage({ message, imageUrl: fileUrl }, (payload) => {
      const { roomId, ...rest } = payload
      console.log('WOWZA it works')
      setMessages((prevMessages) => [...prevMessages, rest])
    })

    formReset()
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

  if (isLoading) {
    return (
      <Stack p={4} width="100%" flexGrow={1} alignItems="center" justifyContent="center">
        <CircularProgress />
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
          {messages.map((msg) => (
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
    </Stack>
  )
}
