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
  imageURL: string
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
        children: props.fullname.charAt(0),
        src: props.imageURL,
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
    <Stack m={4} spacing={3}>
      <Typography fontWeight={700} variant="title3">
        Expert Requests
      </Typography>
      <SearchBar ref={ref} />
      <Stack>
        {requestList.map((value: IExpertApplicationListItemDTO) => {
          return (
            <ExpertCard
              key={value.username}
              fullname={`${value.firstname} ${value.lastname}`}
              username={value.username}
              imageURL={value.imageURL}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}

export default ExpertRequest
