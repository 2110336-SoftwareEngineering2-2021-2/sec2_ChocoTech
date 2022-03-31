import { httpClient } from '@frontend/services'
import { IReview } from '@libs/api'
import { Avatar, Stack, Typography, useTheme } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'

import toast from 'react-hot-toast'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { useMutation } from 'react-query'

function ReviewEntry(props: { data: IReview }) {
  const theme = useTheme()
  const reportReviewMutation = useMutation(async () => {
    return (await httpClient.post('/path')).data
  })
  const handleReport = async () => {
    toast.promise(reportReviewMutation.mutateAsync(), {
      loading: 'loading',
      success: 'report success',
      error: 'report fail',
    })
  }
  return (
    <Stack py="1em" spacing="0.75em">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing="0.5em" alignItems="center">
          {/*TODO Avatar*/}
          <Avatar src="https://mui.com/static/images/avatar/2.jpg" sx={{ width: 24, height: 24 }} />
          <Typography variant="small" fontWeight={400}>
            {props.data.user.username}
          </Typography>
        </Stack>
        {/* <ReviewMenu id={props.data.id} onReport={handleReport} /> */}
      </Stack>
      <Stack direction="row" alignItems="center" spacing="2em">
        <Stack direction="row">
          {Array(5)
            .fill(0)
            .map((_, i) =>
              i < props.data.rating ? (
                <AiFillStar color={theme.palette.primary.dark} key={i} />
              ) : (
                <AiOutlineStar color={theme.palette.primary.dark} key={i} />
              ),
            )}
        </Stack>
        <Typography variant="tiny" fontWeight={400} color="ink.light">
          {formatDistanceToNow(new Date(props.data.createdAt))}
        </Typography>
      </Stack>
      <Typography variant="small" fontWeight={400}>
        {props.data.content}
      </Typography>
    </Stack>
  )
}

export default ReviewEntry
