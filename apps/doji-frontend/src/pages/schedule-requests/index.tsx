import { httpClient } from '@frontend/services'
import { IScheduleResponseDTO } from '@libs/api'
import { SearchBar, SearchBarRef, Tables, TablesActionType } from '@libs/mui'
import { Avatar, Button, Stack, Typography } from '@mui/material'
import router from 'next/router'

import { useRef, useState } from 'react'
import { useQuery } from 'react-query'

function ScheduleCard(props: IScheduleResponseDTO) {
  return (
    <Stack direction="row" justifyContent="space-between" spacing={1}>
      <Stack direction="row">
        <Avatar alt="Robert William" src="https://mui.com/static/images/avatar/1.jpg" />
        <Typography>Test</Typography>
      </Stack>
      <Stack direction="row">
        <Button
          onClick={() => {
            router.push('schedule-requests/' + props.creator.username)
          }}
        >
          Accept
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            router.push('schedule-requests/' + props.creator.username)
          }}
        >
          Reject
        </Button>
      </Stack>
    </Stack>
  )
}

function ScheduleRequest() {
  const ref = useRef<SearchBarRef>(null)
  const lastInput = useRef<string>('')
  const [requestList, setRequestList] = useState([])
  const { data, isLoading } = useQuery<IScheduleResponseDTO[]>(['getApplications'], async () => {
    const { data } = await httpClient.get(`/session/schedule/request`)
    setRequestList(data)
    console.log(data)
    return data
  })

  const fetchData = () => {
    const currentInput = ref.current?.get<string | undefined>('value')
    if (lastInput.current != currentInput) {
      lastInput.current = currentInput
      getData(currentInput)
    }
  }
  useQuery('getApplication', fetchData, {
    refetchInterval: 2000,
  })
  function getData(keyword: string) {
    httpClient.get(`/expert/applications/?keyword=${keyword}`).then((value) => {
      setRequestList(value.data)
    })
  }
  return (
    <Stack m={4}>
      <Typography fontWeight={700} variant="title3">
        Schedule Requests
      </Typography>
      <Stack spacing={1} mt={3}>
        {requestList.map((data: IScheduleResponseDTO) => {
          return (
            <ScheduleCard
              key={data.id}
              fullname={data.session.topic}
              username={data.creator.username}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}

export default ScheduleRequest
