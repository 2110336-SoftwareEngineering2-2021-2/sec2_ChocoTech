import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'
import { ISession } from '@libs/api'
import { SearchBar, SessionCard } from '@libs/mui'
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
      <Stack divider={<Divider flexItem />} spacing={3} mt={4}>
        {data.reverse().map((elem, index) => (
          <SessionCard {...elem} key={elem.id} onClick={() => router.push(`/session/${elem.id}`)} />
        ))}
      </Stack>
    </>
  )
}
export default Index
