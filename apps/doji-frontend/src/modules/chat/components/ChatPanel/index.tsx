import { IconButton, Stack, TextField } from '@mui/material'
import { BiPlus } from 'react-icons/bi'

interface ChatPacelCardProps {}

export const ChatPanel = (props: ChatPacelCardProps) => {
  const onSubmit = () => {}

  return (
    <Stack p={4} width="100%">
      <Stack
        spacing={2}
        component="form"
        onSubmit={onSubmit}
        direction="row"
        width="100%"
        alignItems="center"
      >
        <IconButton color="primary">
          <BiPlus />
        </IconButton>
        <TextField size="small" placeholder="Type message" fullWidth />
      </Stack>
    </Stack>
  )
}
