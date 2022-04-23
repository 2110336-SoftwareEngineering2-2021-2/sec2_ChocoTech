import { Stack } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { getServerSideUser } from '@frontend/common/auth'
import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'

import { IGetChatRoomResponseDTO } from '@libs/api'

import { ChatPanel } from './components/ChatPanel'
import { ChatSidebar } from './components/ChatSidebar'
import { ChatRoomProvider, createChatRoomStore, useChatRoomStore } from './store'

const fetchRoom = async (roomId: string) => {
  return (await httpClient.get<IGetChatRoomResponseDTO>(`/chat/${roomId}`)).data
}

const ChatPage = () => {
  const cleanup = useChatRoomStore((store) => store.cleanup)
  const currentRoomId = useChatRoomStore((store) => store.currentRoomId)

  const {
    data: chatRoom,
    isLoading,
    isError,
  } = useQuery(['/chat', currentRoomId], ({ queryKey }) => fetchRoom(queryKey[1]), {
    enabled: !!currentRoomId,
  })

  // useEffect(() => {
  //   return () => {
  //     cleanup()
  //   }
  // }, [cleanup])

  return (
    <Stack direction="row" flexGrow={1} maxHeight="calc(100vh - 72px)}">
      <ChatSidebar />
      <ChatPanel {...chatRoom} isLoading={isLoading || isError} />
    </Stack>
  )
}

const WrappedChatPage: ExtendedNextPage = () => {
  return (
    <ChatRoomProvider createStore={createChatRoomStore}>
      <ChatPage />
    </ChatRoomProvider>
  )
}

export default WrappedChatPage

WrappedChatPage.containerProps = {
  maxWidth: false,
  sx: {
    p: '0!important',
  },
}

WrappedChatPage.navBarProps = {
  mb: 0,
}

export const getServerSideProps = getServerSideUser()
