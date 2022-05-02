import { Button, Stack, Typography, styled } from '@mui/material'
import Link from 'next/link'
import { useQuery } from 'react-query'

import { getServerSideUser } from '@frontend/common/auth'
import { httpClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'

import { IMyScheduleResponseDTO } from '@libs/api'

import { SessionHistoryCard } from './components/SessionHistoryCard'

const NoHistory = styled(Stack)`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border: 1px solid ${({ theme }) => theme.palette.sky.light};
`

function SessionHistory() {
  const { data, isLoading, isError } = useQuery<IMyScheduleResponseDTO[]>(
    '/session/schedule/me',
    () => httpClient.get('/session/schedule/me').then((res) => res.data),
  )
  const user = useAuthStore((store) => store.user)
  if (isLoading || isError) return null
  return (
    <Stack>
      <Typography variant="title3" py={2} color="ink.dark">
        History
      </Typography>
      {!isLoading && (
        <>
          {data.map((element) => {
            return <SessionHistoryCard username={user?.username} key={element.id} {...element} />
          })}
        </>
      )}
      {data?.length === 0 && (
        <NoHistory p={6} alignItems="center" mt={2} gap={2}>
          <Typography variant="large" fontWeight={500} py={2} color="sky.dark">
            No history found
          </Typography>
          <Link href="/session" passHref>
            <Button variant="outlined">Find interesting session</Button>
          </Link>
        </NoHistory>
      )}
    </Stack>
  )
}
export default SessionHistory
export const getServerSideProps = getServerSideUser()
