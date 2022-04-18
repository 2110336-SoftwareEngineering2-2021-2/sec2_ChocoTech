import { Button, Stack, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import router from 'next/router'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'

import { getServerSideUser } from '@frontend/common/auth'
import { httpClient } from '@frontend/services'

import { IChangeScheduleStatusRequestDTO, ScheduleStatus } from '@libs/api'
import { IScheduleResponseDTO } from '@libs/api'
import { SearchBarRef } from '@libs/mui'

interface PatchChangeSchedule extends IChangeScheduleStatusRequestDTO {
  id: string
}

function ScheduleRequest() {
  const {
    data: requestList,
    isLoading,
    refetch,
  } = useQuery<IScheduleResponseDTO[]>(['/session/schedule/request'], async () => {
    return await (
      await httpClient.get(`/session/schedule/request`)
    ).data
  })

  const changeScheduleStatusMutation = useMutation<void, AxiosError, PatchChangeSchedule>(
    async (data) => {
      return await httpClient.patch(`session/schedule/${data.id}`, { status: data.status })
    },
  )

  const handleDecline = async (id: string) => {
    try {
      await toast.promise(
        changeScheduleStatusMutation.mutateAsync({ id: id, status: ScheduleStatus.CANCELED }),
        {
          loading: 'rejecting schedule...',
          success: 'Successfully reject',
          error: 'Failed to reject schedule',
        },
      )
      await refetch()
    } catch (err) {
      console.log(err)
    }
  }

  const handleAccept = async (id: string) => {
    try {
      await toast.promise(
        changeScheduleStatusMutation.mutateAsync({ id: id, status: ScheduleStatus.ACCEPTED }),
        {
          loading: 'approving schedule...',
          success: 'Successfully approve',
          error: 'Failed to approve schedule',
        },
      )
      await refetch()
    } catch (err) {
      console.log(err)
    }
  }

  if (isLoading) return null

  return (
    <Stack mt={4} spacing={3}>
      <Typography fontWeight={700} variant="title3">
        Schedule Requests
      </Typography>
      <Stack gap={4} mt={3} direction="column">
        {requestList.map((data: IScheduleResponseDTO) => {
          return (
            <Stack direction="row" justifyContent="space-between" spacing={1} key={data.id} mt={2}>
              <Stack direction="column">
                <Typography variant="large" fontWeight={700}>
                  {data.session.topic}
                </Typography>
                <Typography>{new Date(data.startTime).toDateString()}</Typography>
                <Typography>Duration {data.duration} HR</Typography>
                <Typography color="sky.dark">By @{data.creator.username}</Typography>
              </Stack>
              <Stack direction="row" gap={1}>
                <Button onClick={async () => await handleAccept(data.id)}>Accept</Button>
                <Button variant="outlined" onClick={async () => await handleDecline(data.id)}>
                  Reject
                </Button>
              </Stack>
            </Stack>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default ScheduleRequest
export const getServerSideProps = getServerSideUser()
