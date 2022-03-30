import { httpClient } from '@frontend/services'
import { IExpertApplicationListItemDTO } from '@libs/api'
import { SearchBar, SearchBarRef, Tables, TablesActionType } from '@libs/mui'
import { Stack, Typography } from '@mui/material'
import router from 'next/router'

import { useRef, useState } from 'react'
import { useQuery } from 'react-query'

interface IExpertCardProp {
  fullname: string
  username: string
}
function ExpertCard(props: IExpertCardProp) {
  return (
    <Tables
      onClick={() => {
        router.push('expert-requests/' + props.username)
      }}
      action={{
        children: 'detail',
        type: TablesActionType.Button,
      }}
      avatar={{
        alt: 'Robert William',
        children: 'TY',
        src: 'https://mui.com/static/images/avatar/1.jpg',
        sx: {
          bgcolor: 'primary.main',
        },
      }}
      content={props.fullname}
    />
  )
}

function ScheduleRequest() {
  const ref = useRef<SearchBarRef>(null)
  const lastInput = useRef<string>('')
  const [requestList, setRequestList] = useState([])
  const { data, isLoading } = useQuery<IExpertApplicationListItemDTO[]>(
    ['getApplications'],
    async () => {
      const { data } = await httpClient.get(`/session/schedule/request`)
      setRequestList(data)
      console.log(data)
      return data
    },
  )

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
      <br />
      <Typography fontWeight={700} variant="title3">
        Schedule Requests
      </Typography>
      <br />
      <SearchBar ref={ref} />
      <br />
      <Stack>
        {requestList.map((data: IExpertApplicationListItemDTO) => {
          return (
            <ExpertCard
              key={data.username}
              fullname={`${data.firstname} ${data.lastname}`}
              username={data.username}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}

export default ScheduleRequest
