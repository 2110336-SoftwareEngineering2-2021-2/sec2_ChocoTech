import { Avatar, Stack, Typography, styled } from '@mui/material'

const StyleAvatar = styled(Avatar)`
  width: ${({ theme }) => theme.spacing(3)};
  height: ${({ theme }) => theme.spacing(3)};
`
export type SessionCardProps = {
  topic: string
  expertName: string
  price: number
  profileImageURL: string
  sessionDetail?: string
}
export function SessionCard(props: SessionCardProps) {
  return (
    <Stack py={2} spacing={1.5}>
      <Stack direction="row" justifyContent="space-between">
        <div>
          <Typography variant="large" fontWeight={700}>
            {props.topic}
          </Typography>
          <Stack direction="row" alignItems="center" mt={1}>
            <StyleAvatar src={props.profileImageURL} />
            <Typography color="ink.lighter" ml={1} mr={0.5} variant="small" fontWeight={400}>
              by
            </Typography>
            <Typography color="ink.lighter" variant="small" fontWeight={500}>
              {props.expertName}
            </Typography>
          </Stack>
        </div>
        <Stack alignItems="flex-end">
          <Typography color="primary.dark" variant="large" fontWeight={700}>
            {`${props.price} DC`}
          </Typography>
          <Typography color="primary.dark" variant="tiny" fontWeight={400}>
            /hr/person
          </Typography>
        </Stack>
      </Stack>
      <Typography color="ink.main" variant="small" fontWeight={400}>
        {props.sessionDetail}
      </Typography>
    </Stack>
  )
}
