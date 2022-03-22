import SessionHistoryCard, {
  SessionHistoryCardProps,
} from '@frontend/components/Card/SessionHistoryCard'
import { Stack, Typography } from '@mui/material'

const mockData: SessionHistoryCardProps[] = [
  {
    avatarURL: '',
    title: 'Pending Card',
    date: 'data1',
    isPending: true,
    isAccepted: false,
    isCancel: false,
    hasPenalty: false,
    refundAmount: 500,
    deductAmount: 10,
    sessionId: 1,
    expertName: 'A',
  },
  {
    avatarURL: '',
    title: 'Accepted Card',
    date: 'data2',
    isPending: false,
    isAccepted: true,
    isCancel: false,
    hasPenalty: true,
    refundAmount: 500,
    deductAmount: 10,
    sessionId: 2,
    expertName: 'B',
  },
  {
    avatarURL: '',
    title: 'Declined Card',
    date: 'data3',
    isPending: false,
    isAccepted: false,
    isCancel: false,
    hasPenalty: false,
    refundAmount: 500,
    deductAmount: 10,
    sessionId: 3,
    expertName: 'C',
  },
  {
    avatarURL: '',
    title: 'Cancel Card',
    date: 'data4',
    isPending: false,
    isAccepted: false,
    isCancel: true,
    hasPenalty: false,
    refundAmount: 500,
    deductAmount: 10,
    sessionId: 4,
    expertName: 'D',
  },
]
function SessionHistory() {
  return (
    <Stack>
      <Typography variant="title3" py={2} mt={2}>
        History
      </Typography>
      {mockData.map((data, key) => {
        return <SessionHistoryCard {...data} key={key} />
      })}
    </Stack>
  )
}
export default SessionHistory
