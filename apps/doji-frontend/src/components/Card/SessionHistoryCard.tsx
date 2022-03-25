import SessionHistoryCardMenu from '@frontend/components/Card/SessionHistoryCardMenu'
import SessionStatusCard from '@frontend/components/Card/SessionStatusCard'
import { ISession, SessionStatus } from '@libs/api'
import { Avatar, Box, Button, Divider, Stack, Typography, styled } from '@mui/material'

export interface SessionHistoryCardProps extends ISession {}
function SessionHistoryCard(props: SessionHistoryCardProps) {
  function refundAmount() {
    return 500
  }
  function deductAmount() {
    return 10
  }
  function hasPenalty() {
    return true
  }
  return (
    <>
      <Box px={3} py={2.75}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ width: '100%' }}>
            <Avatar src={props.creator.profilePictureURL} />
            <Stack direction="column" spacing={1.5} sx={{ width: '100%' }}>
              <Stack direction="column" spacing={0.5} sx={{ width: '100%' }}>
                <Typography variant="regular" fontWeight={500} color="ink.darkest">
                  {props.topic}
                </Typography>
                <Typography variant="small" fontWeight={400} color="ink.lighter">
                  {props.startTime.toDateString()}
                </Typography>
              </Stack>
              <div>
                <SessionStatusCard status={props.status} />
              </div>
              {props.status === SessionStatus.ACCEPTED && (
                <Button variant="outlined" size="small" fullWidth>
                  Join Session
                </Button>
              )}
            </Stack>
          </Stack>
          <SessionHistoryCardMenu
            sessionId={props.id}
            expertName={props.creator.username}
            title={props.topic}
            hasPenalty={hasPenalty()}
            deductAmount={deductAmount()}
            refundAmount={refundAmount()}
          />
        </Box>
      </Box>
      <Divider />
    </>
  )
}
export default SessionHistoryCard
