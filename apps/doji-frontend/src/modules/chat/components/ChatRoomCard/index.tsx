import { Avatar, Stack, Typography, styled } from '@mui/material'
import { useMemo } from 'react'

import { IGetAllChatRoomsResponseDTO } from '@libs/api'

const StyledStack = styled(Stack)`
  cursor: pointer;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  transition: ${({ theme }) => theme.transitions.create('background-color')};
  &:hover {
    background-color: ${({ theme }) => theme.palette.sky.lighter};
  }
`

interface ChatRoomCardProps extends IGetAllChatRoomsResponseDTO {
  selected?: boolean
  onClick?: () => void
}

export const ChatRoomCard = ({
  name,
  lastMessage,
  participants,
  onClick,
  selected,
}: ChatRoomCardProps) => {
  const firstParticipant = participants[0]

  const message = useMemo(() => {
    if (!lastMessage) return 'No message'
    if (lastMessage.message) return `${lastMessage.author.displayName}: ${lastMessage.message}`
    return `${firstParticipant.displayName}: send file`
  }, [lastMessage, firstParticipant])

  return (
    <StyledStack
      p={2}
      direction="row"
      spacing={2}
      alignItems="center"
      onClick={onClick}
      sx={{
        bgcolor: selected ? 'sky.lighter' : 'transparent',
      }}
    >
      <Avatar src={firstParticipant.profilePictureURL} sx={{ bgcolor: 'primary.main' }}>
        {firstParticipant.displayName.charAt(0).toUpperCase()}
      </Avatar>
      <Stack spacing={1}>
        <Typography variant="regular">{name}</Typography>
        <Typography variant="tiny" color="sky.dark">
          {message}
        </Typography>
      </Stack>
    </StyledStack>
  )
}
