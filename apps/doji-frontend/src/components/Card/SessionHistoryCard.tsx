import SessionHistoryCardMenu from '@frontend/components/Card/SessionHistoryCardMenu'
import SessionStatusCard from '@frontend/components/Card/SessionStatusCard'
import { Avatar, Box, Button, Divider, Stack, Typography, styled } from '@mui/material'

export interface SessionHistoryCardProps {
  avatarURL: string
  title: string
  date: string
  isPending: boolean
  isAccepted: boolean
  isCancel: boolean
  hasPenalty: boolean
  deductAmount: number
  refundAmount: number
  sessionId: number
  expertName: string
}
function SessionHistoryCard(props: SessionHistoryCardProps) {
  return (
    <>
      <Box px={3} py={2.75}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ width: '100%' }}>
            <Avatar src={props.avatarURL} />
            <Stack direction="column" spacing={1.5} sx={{ width: '100%' }}>
              <Stack direction="column" spacing={0.5} sx={{ width: '100%' }}>
                <Typography variant="regular" fontWeight={500} color="ink.darkest">
                  {props.title}
                </Typography>
                <Typography variant="small" fontWeight={400} color="ink.lighter">
                  {props.date}
                </Typography>
              </Stack>
              <div>
                <SessionStatusCard
                  is_pending={props.isPending}
                  is_accepted={props.isAccepted}
                  is_cancel={props.isCancel}
                />
              </div>
              {props.isAccepted && (
                <Button variant="outlined" size="small" fullWidth>
                  Join Session
                </Button>
              )}
            </Stack>
          </Stack>
          <SessionHistoryCardMenu
            sessionId={props.sessionId}
            expertName={props.expertName}
            title={props.title}
            hasPenalty={props.hasPenalty}
            deductAmount={props.deductAmount}
            refundAmount={props.refundAmount}
          />
        </Box>
      </Box>
      <Divider />
    </>
  )
}
export default SessionHistoryCard
