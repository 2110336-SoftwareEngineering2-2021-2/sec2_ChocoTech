import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material'
import { userInfo } from 'os'
import React, { useEffect } from 'react'

import { IMyScheduleResponseDTO, ISchedule, ScheduleStatus } from '@libs/api'

import { SessionHistoryCardMenu } from './components/SessionHistoryCardMenu'
import { SessionStatusCard } from './components/SessionStatusCard'

export interface SessionHistoryCardProps extends IMyScheduleResponseDTO {
  username: string
}

export function SessionHistoryCard(props: SessionHistoryCardProps) {
  const [currentSession, setSession] = React.useState<SessionHistoryCardProps>(props)
  useEffect(() => {
    setSession(props)
  }, [props])
  function refundAmount() {
    if (hasPenalty()) {
      return props.coinOnHold - deductAmount()
    }
    return props.coinOnHold
  }
  function deductAmount() {
    return props.coinOnHold * 0.3
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
          {currentSession.creator === props.username && (
            <SessionHistoryCardMenu
              scheduleId={currentSession.id}
              sessionId={currentSession.session.id}
              expertName={currentSession.session.owner.displayName}
              title={currentSession.session.topic}
              hasPenalty={hasPenalty()}
              deductAmount={deductAmount()}
              refundAmount={refundAmount()}
            />
          )}
        </Box>
      </Box>
      <Divider />
    </>
  )
}
