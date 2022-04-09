import { Avatar, Stack, Typography } from '@mui/material'

import { ISession } from '@libs/api'

export interface SessionDetailProps extends ISession {}
function SessionDetail(props: SessionDetailProps) {
  return (
    <div>
      <Stack direction="row" py="0.5em" justifyContent="space-between">
        <Stack spacing="0.5em">
          <Typography variant="large" fontWeight={700}>
            {props.topic}
          </Typography>
          <Stack direction="row" spacing="0.5em">
            <Avatar src={props.owner.profilePictureURL} sx={{ width: 24, height: 24 }} />
            <Typography variant="small" fontWeight={400}>
              by{' '}
              <Typography variant="small" fontWeight={500}>
                {props.owner.displayName}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
        <Stack textAlign="right">
          <Typography variant="large" fontWeight={700} color="primary.dark">
            {props.fee}
          </Typography>
          <Typography color="primary.dark">/hr/person</Typography>
        </Stack>
      </Stack>
      <Typography>{props.description}</Typography>
    </div>
  )
}

export default SessionDetail
