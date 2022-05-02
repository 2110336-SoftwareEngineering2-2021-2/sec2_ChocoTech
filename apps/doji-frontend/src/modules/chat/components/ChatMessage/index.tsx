import { Avatar, Stack, Tooltip, Typography, styled } from '@mui/material'
import Image from 'next/image'

import { IMessageDTO } from '@libs/api'

const Chat = styled(Typography)`
  max-width: 300px;
  width: fit-content;
  word-wrap: break-word;
  padding: ${({ theme }) => theme.spacing(1, 2)};
  line-height: 1.75;
  border-radius: 20px;
`

const ChatImage = styled('span')`
  max-width: 300px;
  width: 300px;
  height: 300px;
  position: relative;
  margin: ${({ theme }) => theme.spacing(1, 2)};
  border-radius: 20px;
  img {
    border-radius: 20px;
  }
`

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
  const direction = owner ? 'row-reverse' : 'row'
  const bgcolor = owner ? 'primary.main' : 'sky.light'
  const color = owner ? 'white' : 'ink.dark'
  const textAlign = owner ? 'right' : 'left'
  const placement = owner ? 'left-end' : 'right-end'
  const alignItems = owner ? 'flex-end' : 'flex-start'

  return (
    <Stack direction={direction} width="100%" spacing={1.5} alignItems="flex-end">
      <Avatar src={author.profilePictureURL}>
        {author.displayName && author.displayName[0].toUpperCase()}
      </Avatar>
      <Tooltip title={timestamp} placement={placement}>
        <Stack justifyContent="center" spacing={1} alignItems={alignItems}>
          <Typography variant="tiny" color="sky.main" textAlign={textAlign}>
            {author.displayName}
          </Typography>
          {message && (
            <Chat variant="small" sx={{ bgcolor }} color={color}>
              {message}
            </Chat>
          )}
          {imageUrl && (
            <ChatImage>
              <Image src={imageUrl} layout="fill" objectFit="contain" alt={imageUrl} />
            </ChatImage>
          )}
        </Stack>
      </Tooltip>
    </Stack>
  )
}
