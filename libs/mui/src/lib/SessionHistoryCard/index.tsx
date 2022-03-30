import { ISchedule, ScheduleStatus } from '@libs/api'
import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material'

import { SessionHistoryCardMenu } from './components/SessionHistoryCardMenu'
import { SessionStatusCard } from './components/SessionStatusCard'

export interface SessionHistoryCardProps extends ISchedule {}

export function SessionHistoryCard(props: SessionHistoryCardProps) {
  function refundAmount() {
    if (hasPenalty()) {
      return props.session.fee - deductAmount()
    }
    return props.session.fee
  }
  function deductAmount() {
    return props.session.fee * 0.3
  }
  function hasPenalty() {
    const dateStart = new Date(props.startTime)
    const dateCurrent = new Date()

    const DifferenceInTime = dateCurrent.getTime() - dateStart.getTime()

    const DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24)

    if (DifferenceInDays > 3) {
      return false
    }
    return true
  }
  //
  return (
    <>
      <Box px={3} py={2.75}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ width: '100%' }}>
            <Avatar src={props.session.owner.profilePictureURL} />
            <Stack direction="column" spacing={1.5} sx={{ width: '100%' }}>
              <Stack direction="column" spacing={0.5} sx={{ width: '100%' }}>
                <Typography variant="regular" fontWeight={500} color="ink.darkest">
                  {props.session.topic}
                </Typography>
                <Typography variant="small" fontWeight={400} color="ink.lighter">
                  {new Date(props.startTime).toDateString()}
                </Typography>
              </Stack>
              <div>
                <SessionStatusCard status={props.status} />
              </div>
              {props.status === ScheduleStatus.ACCEPTED && (
                <Button variant="outlined" size="small" fullWidth href={props.meetUrl}>
                  Join Session
                </Button>
              )}
            </Stack>
          </Stack>
          <SessionHistoryCardMenu
            sessionId={props.session.id}
            expertName={props.creator.username}
            title={props.session.topic}
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
