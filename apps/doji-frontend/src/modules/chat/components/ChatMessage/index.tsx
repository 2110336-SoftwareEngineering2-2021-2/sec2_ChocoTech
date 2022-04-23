import { Avatar, Stack, Typography } from '@mui/material'

import { IMessageDTO } from '@libs/api'

interface ChatMessageProps extends IMessageDTO {
  owner: boolean
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  owner,
  timestamp,
  author,
  message,
  imageUrl,
}) => {
  const direction = owner ? 'row' : 'row-reverse'
  const bgcolor = owner ? 'primary.main' : 'sky.lighter'

  return (
    <Stack direction={direction} width="100%" alignItems="center">
      <Avatar src={author.profilePictureURL}>{author.displayName && author.displayName[0]}</Avatar>
      {message && (
        <Typography variant="regular" p={1} sx={{ bgcolor: bgcolor }}>
          {message}
        </Typography>
      )}
    </Stack>
  )
}
