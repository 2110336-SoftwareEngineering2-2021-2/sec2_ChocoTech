import SessionHistoryCardMenu from '@frontend/components/Card/SessionHistoryCardMenu'
import SessionStatusCard from '@frontend/components/Card/SessionStatusCard'
import { Avatar, Box, Button, Divider, Stack, Typography, styled } from '@mui/material'

export interface SessionHistoryCardProps {
  avatarURL: string
  title: string
  date: string
  is_pending: boolean
  is_accepted: boolean
  is_cancel: boolean
  has_penalty: boolean
  refund_amount: number
  session_id: number
}
function SessionHistoryCard(props: SessionHistoryCardProps) {
  return (
    <>
      <Box px={3} py={2.75}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <Avatar src={props.avatarURL} />
            <Stack direction="column" spacing={1.5}>
              <Stack direction="column" spacing={0.5}>
                <Typography variant="regular" fontWeight={500} color="ink.darkest">
                  {props.title}
                </Typography>
                <Typography variant="small" fontWeight={400} color="ink.lighter">
                  {props.date}
                </Typography>
              </Stack>
              <SessionStatusCard
                is_pending={props.is_pending}
                is_accepted={props.is_accepted}
                is_cancel={props.is_cancel}
              />
              {props.is_accepted && (
                <Button variant="outlined" size="small">
                  Join Session
                </Button>
              )}
            </Stack>
          </Stack>
          <SessionHistoryCardMenu />
        </Box>
      </Box>
      <Divider />
    </>
  )
}
export default SessionHistoryCard
