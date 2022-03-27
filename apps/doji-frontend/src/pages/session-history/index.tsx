import { SessionHistoryCard, mockSessionHistoryData } from '@libs/mui'
import { Stack, Typography } from '@mui/material'

function SessionHistory() {
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
