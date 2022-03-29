import { httpClient } from '@frontend/services'
import { SessionHistoryCard, SessionHistoryCardProps, mockSessionHistoryData } from '@libs/mui'
import { Stack, Typography } from '@mui/material'

import { useEffect, useState } from 'react'

function SessionHistory() {
  const [currentData, setData] = useState<Array<SessionHistoryCardProps>>([])
  async function getAllSession() {
    const response = await httpClient.get(`session`)
    setData(response.data)
  }
  useEffect(() => {
    getAllSession()
  }, [])
  return (
    <Stack>
      <Typography variant="title3" py={2} mt={2}>
        History
      </Typography>
      {currentData.map((data, key) => {
        return <SessionHistoryCard {...data} key={key} />
      })}
    </Stack>
  )
}
export default SessionHistory
