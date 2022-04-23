import { Avatar, Stack, Typography, styled } from '@mui/material'

import { ISession } from '@libs/api'

import StatusBadge from '../StatusBadge'

const StyleAvatar = styled(Avatar)`
  width: ${({ theme }) => theme.spacing(3)};
  height: ${({ theme }) => theme.spacing(3)};
`
const StyledStack = styled(Stack)`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  transition: ${({ theme }) => theme.transitions.create('background')};
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.palette.sky.lighter};
  }
`
// export type SessionCardProps = {
//   topic: string
//   expertName: string
//   price: number
//   profileImageURL: string
//   sessionDetail?: string
// }
export interface SessionCardProps extends ISession {
  onClick: () => void
}
export function SessionCard(props: SessionCardProps) {
  return (
    <StyledStack p={2} spacing={1.5} onClick={props.onClick}>
      <Stack direction="row" justifyContent="space-between">
        <div>
          <Typography variant="large" fontWeight={700}>
            {props.topic}
          </Typography>
          <Stack direction="row" alignItems="center" mt={1}>
            <StatusBadge username={props.owner.username}>
              <StyleAvatar src={props.owner.profilePictureURL} />
            </StatusBadge>
            <Typography color="ink.lighter" ml={1} mr={0.5} variant="small" fontWeight={400}>
              by
            </Typography>
            <Typography color="ink.lighter" variant="small" fontWeight={500}>
              {props.owner.username}
            </Typography>
          </Stack>
        </div>
        <Stack alignItems="flex-end">
          <Typography color="primary.dark" variant="large" fontWeight={700}>
            {`${props.fee} DC`}
          </Typography>
          <Typography color="primary.dark" variant="tiny" fontWeight={400}>
            /hr/person
          </Typography>
        </Stack>
      </Stack>
      <Typography color="ink.main" variant="small" fontWeight={400}>
        {props.description}
      </Typography>
    </StyledStack>
  )
}
