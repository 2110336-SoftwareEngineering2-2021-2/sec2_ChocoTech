import { httpClient } from '@frontend/services'
import { IExpertApplicationListItemDTO } from '@libs/api'
import { SearchBar, SearchBarRef, Tables, TablesActionType } from '@libs/mui'
import { Stack, Typography } from '@mui/material'

import { useRef, useState } from 'react'
import { useQuery } from 'react-query'

interface IExpertCardProp {
  fullname: string
  username: string
}
function ExpertCard(props: IExpertCardProp) {
  return (
    <Tables
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

function ExpertRequest() {
  const ref = useRef<SearchBarRef>(null)
  const lastInput = useRef<string>('')
  const [requestList, setRequestList] = useState([])
  const { data, isLoading } = useQuery<IExpertApplicationListItemDTO[]>(
    ['getApplications'],
    async () => {
      const { data } = await httpClient.get(`/expert/applications/`)
      setRequestList(data)
      return data
    },
  )
  setInterval(() => {
    const currentInput = ref.current?.get<string | undefined>('value')
    if (lastInput.current != currentInput) {
      lastInput.current = currentInput
      getData(currentInput)
    }
  }, 2000)
  function getData(keyword: string) {
    httpClient.get(`/expert/applications/?keyword=${keyword}`).then((value) => {
      setRequestList(value.data)
    })
  }
  return (
    <Stack>
      <br />
      <Typography fontWeight={700} variant="h4">
        Expert Requests
      </Typography>
      <br />
      <SearchBar ref={ref} />
      <br />
      <Stack>
        {requestList.map((value: IExpertApplicationListItemDTO) => {
          return (
            <ExpertCard
              key={value.username}
              fullname={`${value.firstname} ${value.lastname}`}
              username={value.username}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}

export default ExpertRequest
