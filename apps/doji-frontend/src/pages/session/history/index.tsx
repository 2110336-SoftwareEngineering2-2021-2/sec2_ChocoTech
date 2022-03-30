import { httpClient } from '@frontend/services'
import { ISchedule, ISession } from '@libs/api'
import { SessionHistoryCard } from '@libs/mui'
import { Stack, Typography } from '@mui/material'

import { useQuery } from 'react-query'

function SessionHistory() {
  const { data, isLoading } = useQuery<ISchedule[]>('/session/schedule/me', () =>
    httpClient.get('/session/schedule/me').then((res) => res.data),
  )
  return (
    <Stack>
      <Typography variant="title3" py={2} mt={2}>
        History
      </Typography>
      {!isLoading && (
        <>
          {data.map((element, key) => {
            return <SessionHistoryCard {...element} key={element.id} />
          })}
        </>
      )}
    </Stack>
  )
}
export default SessionHistory
