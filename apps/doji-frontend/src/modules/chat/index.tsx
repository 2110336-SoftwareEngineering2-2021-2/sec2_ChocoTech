import { Stack } from '@mui/material'
import { useCallback, useState } from 'react'

import { ExtendedNextPage } from '@frontend/type'

import { ChatPanel } from './components/ChatPanel'
import { ChatSidebar } from './components/ChatSidebar'

const ChatPage: ExtendedNextPage = () => {
  const [roomId, setRoomId] = useState('')

  const handleChangeRoom = useCallback((roomId: string) => {
    setRoomId(roomId)
  }, [])

  return (
    <Stack direction="row" flexGrow={1}>
      <ChatSidebar changeRoom={handleChangeRoom} />
      <ChatPanel roomId={roomId} />
    </Stack>
  )
}

export default ChatPage

ChatPage.containerProps = {
  maxWidth: false,
  sx: {
    p: '0!important',
  },
}

ChatPage.navBarProps = {
  mb: 0,
}
