import { Stack } from '@mui/material'

import { ExtendedNextPage } from '@frontend/type'

import { ChatPanel } from './components/ChatPanel'
import { ChatSidebar } from './components/ChatSidebar'

const ChatPage: ExtendedNextPage = () => {
  return (
    <Stack direction="row" flexGrow={1}>
      <ChatSidebar />
      <ChatPanel roomId="120" />
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
