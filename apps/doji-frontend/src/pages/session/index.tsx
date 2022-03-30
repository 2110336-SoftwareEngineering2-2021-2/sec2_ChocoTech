import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'
import { ISchedule, ISession } from '@libs/api'
import { SearchBar, SessionCard, SessionCardProps } from '@libs/mui'
import { Divider, Stack } from '@mui/material'
import { useRouter } from 'next/router'

import { useQuery } from 'react-query'

const Index: ExtendedNextPage = () => {
  const { data, isLoading } = useQuery<ISession[]>('/session', () =>
    httpClient.get('/session').then((res) => res.data),
  )
  const router = useRouter()
  if (isLoading) return null
  return (
    <>
      <SearchBar />
      <Stack divider={<Divider flexItem />} spacing={2}>
        {data.map((elem, index) => (
          <SessionCard {...elem} key={elem.id} onClick={() => router.push(`/session/${elem.id}`)} />
        ))}
      </Stack>
    </>
  )
}
export default Index
