import { Button, CircularProgress, IconButton, Stack, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { useQuery } from 'react-query'

import { httpClient } from '@frontend/services'

import { IGetAllChatRoomsResponseDTO } from '@libs/api'

import { useChatRoomStore } from '../../store'
import { ChatRoomCard } from '../ChatRoomCard'

interface ChatSidebarProps {
  roomId?: string
}

const ChatRoomDialog = dynamic(
  () => import('../ChatRoomDialog').then((mod) => mod.ChatRoomDialog),
  { ssr: false },
)

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ roomId }) => {
  const router = useRouter()
  const joinChatRoom = useChatRoomStore((store) => store.joinChatRoom)

  const {
    data: chatRooms,
    isLoading,
    isError,
  } = useQuery(
    '/chat',
    async () => {
      return (await httpClient.get<IGetAllChatRoomsResponseDTO[]>('/chat')).data
    },
    {
      onSuccess: (data) => {
        if (data.length === 0) return
        const allRoomIds = data.map((room) => room.id)
        joinChatRoom(allRoomIds)
      },
    },
  )

  const [openDialog, setOpenDialog] = useState(false)

  const handleChatRoomClick = (roomId: string) => {
    router.push(`/chat?roomId=${roomId}`)
  }

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  if (isLoading || isError)
    return (
      <Stack
        p={4}
        maxWidth={320}
        width="100%"
        boxShadow={3}
        flexGrow={1}
        alignItems="center"
        justifyContent="center"
      >
        {isLoading ? <CircularProgress /> : <Typography variant="title3">Error</Typography>}
      </Stack>
    )

  return (
    <>
      <Stack p={2} maxWidth={320} width="100%" boxShadow={3} flexGrow={1} spacing={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography p={2} variant="title3">
            Chat
          </Typography>
          <div>
            <IconButton color="primary" onClick={handleOpenDialog}>
              <FiPlus />
            </IconButton>
          </div>
        </Stack>
        <Stack spacing={1} alignItems="center" flexGrow={1}>
          {chatRooms.map((chatRoom) => (
            <ChatRoomCard
              key={chatRoom.id}
              selected={chatRoom.id === roomId}
              onClick={() => handleChatRoomClick(chatRoom.id)}
              {...chatRoom}
            />
          ))}
          {chatRooms.length === 0 && (
            <Stack spacing={4} alignItems="center" justifyContent="center" flexGrow={1}>
              <Typography variant="large" color="ink.dark">
                No chat room
              </Typography>
              <Button onClick={handleOpenDialog}>Create chat room</Button>
            </Stack>
          )}
        </Stack>
      </Stack>
      <ChatRoomDialog
        open={openDialog}
        onClose={handleCloseDialog}
        close={handleCloseDialog}
        roomId={roomId}
      />
    </>
  )
}
