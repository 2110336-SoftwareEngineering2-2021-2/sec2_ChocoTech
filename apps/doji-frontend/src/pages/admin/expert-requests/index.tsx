import { Stack, Typography, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useQuery } from 'react-query'

import { useAdminAuthGuard } from '@frontend/hooks/admin'
import { httpClient } from '@frontend/services'
import { useAdminAuthStore } from '@frontend/stores'
import { ExtendedNextPage } from '@frontend/type'

import { IExpertApplicationListItemDTO } from '@libs/api'
import { SearchBar, SearchBarRef, Tables, TablesActionType } from '@libs/mui'

const NoData = styled(Stack)`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border: 1px solid ${({ theme }) => theme.palette.sky.light};
`

interface IExpertCardProp {
  displayname: string
  username: string
  imageURL: string
  onClick: (url) => void
}

function ExpertCard(props: IExpertCardProp) {
  return (
    <div>
      <Tables
        onClick={props.onClick}
        action={{
          children: 'detail',
          type: TablesActionType.Button,
        }}
        avatar={{
          alt: 'Robert William',
          children: props.username.charAt(0),
          src: props.imageURL,
          sx: {
            bgcolor: 'primary.main',
          },
        }}
        content={props.username}
        caption={`@${props.displayname}`}
      />
    </div>
  )
}

const ExpertRequestPage: ExtendedNextPage = () => {
  useAdminAuthGuard()

  const router = useRouter()
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
    if (isLoading) {
      return null
    }
  }

  return (
    <Stack spacing={3} mt={10}>
      <Typography fontWeight={700} variant="title3">
        Expert Requests
      </Typography>
      <SearchBar ref={ref} />
      <Stack>
        {requestList.map((value: IExpertApplicationListItemDTO) => {
          return (
            <ExpertCard
              key={value.username}
              displayname={value.displayName}
              username={value.username}
              imageURL={value.imageURL}
              onClick={(url) => {
                router.push(`expert-requests/${value.username}`)
              }}
            />
          )
        })}
        {requestList?.length === 0 && (
          <NoData px={4} py={6} alignItems="center">
            <Typography variant="large" color="sky.dark">
              No data
            </Typography>
          </NoData>
        )}
      </Stack>
    </Stack>
  )
}

export default ExpertRequestPage

ExpertRequestPage.dontShowNavBar = true
