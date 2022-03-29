import { httpClient } from '@frontend/services'
import { ISchedule } from '@libs/api'
import { SessionHistoryCard } from '@libs/mui'
import { Stack, Typography } from '@mui/material'

import { useQuery } from 'react-query'

function SessionHistory() {
  const { data, isLoading } = useQuery<ISchedule[]>('/session', () =>
    httpClient.get('/session').then((res) => res.data),
  )
  return (
    <Stack>
      <Typography variant="title3" py={2} mt={2}>
        History
      </Typography>
      {!isLoading && (
        <>
          {data.map((element, key) => {
            return <SessionHistoryCard {...element} key={key} />
          })}
        </>
      )}
    </Stack>
  )
}
export default SessionHistory
