import { Button, Stack, Typography, styled } from '@mui/material'
import Link from 'next/link'
import { useQuery } from 'react-query'

import { httpClient } from '@frontend/services'

import { ISchedule } from '@libs/api'
import { SessionHistoryCard } from '@libs/mui'

const NoHistory = styled(Stack)`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  border: 1px solid ${({ theme }) => theme.palette.sky.light};
`

function SessionHistory() {
  const { data, isLoading } = useQuery<ISchedule[]>('/session/schedule/me', () =>
    httpClient.get('/session/schedule/me').then((res) => res.data),
  )

  return (
    <Stack>
      <Typography variant="title3" py={2} color="ink.dark">
        History
      </Typography>
      {!isLoading && (
        <>
          {data.map((element) => {
            return <SessionHistoryCard {...element} key={element.id} />
          })}
        </>
      )}
      {data.length === 0 && (
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
