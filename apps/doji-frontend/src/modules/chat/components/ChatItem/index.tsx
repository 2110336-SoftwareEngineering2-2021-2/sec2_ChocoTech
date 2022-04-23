import { Avatar, Stack, Typography } from '@mui/material'

interface ChatItemProps {
  owner: boolean
  message: string
  displayName: string
  profilePictureUrl?: string
}

export const ChatItem: React.FC<ChatItemProps> = ({
  owner,
  message,
  displayName,
  profilePictureUrl,
}) => {
  const direction = owner ? 'row' : 'row-reverse'
  const bgcolor = owner ? 'primary.main' : 'sky.lighter'

  return (
    <Stack direction={direction} width="100%" alignItems="center">
      <Avatar src={profilePictureUrl}>{displayName && displayName[0]}</Avatar>
      <Typography variant="regular" p={1} sx={{ bgcolor: bgcolor }}>
        {message}
      </Typography>
    </Stack>
  )
}
