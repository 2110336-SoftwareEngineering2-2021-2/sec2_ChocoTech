import { CircularProgress, Stack, Typography } from '@mui/material'
import { useQuery } from 'react-query'

import { httpClient } from '@frontend/services'

import { IGetAllChatRoomsResponseDTO } from '@libs/api'

interface ChatSidebarProps {
  changeRoom: (roomId: string) => void
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ changeRoom }) => {
  const {
    data: chatRooms,
    isLoading,
    isError,
  } = useQuery('/chat', async () => {
    return (await httpClient.get<IGetAllChatRoomsResponseDTO[]>('/chat')).data
  })

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
    <Stack p={4} maxWidth={320} width="100%" boxShadow={3} flexGrow={1}>
      <Typography variant="title3">Chat</Typography>
      {chatRooms.map((chatRoom) => (
        <Stack key={chatRoom.id} onClick={() => changeRoom(chatRoom.id)}></Stack>
      ))}
    </Stack>
  )
}
