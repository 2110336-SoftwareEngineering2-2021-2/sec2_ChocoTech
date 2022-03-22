import SessionHistoryCard, {
  SessionHistoryCardProps,
} from '@frontend/components/Card/SessionHistoryCard'
import { Stack, Typography } from '@mui/material'

const mockData: SessionHistoryCardProps[] = [
  {
    avatarURL: '',
    title: 'Pending Card',
    date: 'data1',
    is_pending: true,
    is_accepted: false,
    is_cancel: false,
    has_penalty: false,
    refund_amount: 500,
    session_id: 1,
  },
  {
    avatarURL: '',
    title: 'Accepted Card',
    date: 'data2',
    is_pending: false,
    is_accepted: true,
    is_cancel: false,
    has_penalty: true,
    refund_amount: 500,
    session_id: 2,
  },
  {
    avatarURL: '',
    title: 'Declined Card',
    date: 'data3',
    is_pending: false,
    is_accepted: false,
    is_cancel: false,
    has_penalty: false,
    refund_amount: 500,
    session_id: 3,
  },
  {
    avatarURL: '',
    title: 'Cancel Card',
    date: 'data4',
    is_pending: false,
    is_accepted: false,
    is_cancel: true,
    has_penalty: false,
    refund_amount: 500,
    session_id: 4,
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
