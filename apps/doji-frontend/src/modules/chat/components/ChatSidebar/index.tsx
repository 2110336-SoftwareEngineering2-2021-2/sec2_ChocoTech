import { CircularProgress, Stack, Typography } from '@mui/material'
import { useQuery } from 'react-query'

import { ChatRoomCard } from '@frontend/modules/chat/components/ChatRoomCard'
import { useChatRoomStore } from '@frontend/modules/chat/store'
import { httpClient } from '@frontend/services'

import { IGetAllChatRoomsResponseDTO } from '@libs/api'

export const ChatSidebar: React.FC = () => {
  const currentRoomId = useChatRoomStore((store) => store.currentRoomId)
  const setCurrentRoomId = useChatRoomStore((store) => store.setCurrentRoomId)

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
        if (!currentRoomId) setCurrentRoomId(data[0].id)
      },
    },
  )

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
    <Stack p={2} maxWidth={320} width="100%" boxShadow={3} flexGrow={1} spacing={3}>
      <Typography p={2} variant="title3">
        Chat
      </Typography>
      <Stack spacing={1}>
        {chatRooms.map((chatRoom) => (
          <ChatRoomCard
            key={chatRoom.id}
            selected={chatRoom.id === currentRoomId}
            onClick={() => setCurrentRoomId(chatRoom.id)}
            {...chatRoom}
          />
        ))}
      </Stack>
    </Stack>
  )
}
