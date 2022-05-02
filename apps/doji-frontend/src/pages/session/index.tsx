import { Divider, Stack, Typography, styled } from '@mui/material'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'

import { ISession } from '@libs/api'
import { SearchBar, SessionCard } from '@libs/mui'

const NoSession = styled(Stack)`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border: 1px solid ${({ theme }) => theme.palette.sky.light};
`

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
        {data.reverse().map((elem) => (
          <SessionCard {...elem} key={elem.id} onClick={() => router.push(`/session/${elem.id}`)} />
        ))}
        {data.length === 0 && (
          <NoSession p={6} gap={2} alignItems="center">
            <Typography variant="large" fontWeight={500} py={2} color="sky.dark">
              No session found
            </Typography>
          </NoSession>
        )}
      </Stack>
    </>
  )
}
export default Index
