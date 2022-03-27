import { SessionHistoryCard, mockSessionHistoryData } from '@libs/mui'
import { Stack, Typography } from '@mui/material'
import axios from 'axios'

import { useEffect, useState } from 'react'

function SessionHistory() {
  const [currentData, setData] = useState<Array<SessionHistoryCardProps>>([])
  async function getAllSession() {
    await axios
      .get('http://localhost:3333/api/session', { withCredentials: true })
      .then(function (response) {
        setData(response.data)
      })
      .catch(function (response) {
        console.log(response)
      })
  }
  useEffect(() => {
    // getAllSession()
  }, [])
  return (
    <Stack>
      <Typography variant="title3" py={2} mt={2}>
        History
      </Typography>
      {mockSessionHistoryData.map((data, key) => {
        return <SessionHistoryCard {...data} key={key} />
      })}
    </Stack>
  )
}
export default SessionHistory
