import { IPublicSessionReviewDTO } from '@libs/api'
import { Avatar, Stack, Typography, useTheme } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'

import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'

function ReviewEntry(props: { data: IPublicSessionReviewDTO }) {
  const theme = useTheme()
  return (
    <Stack py="1em" spacing="0.75em">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing="0.5em" alignItems="center">
          //TODO Avatar
          <Avatar src="https://mui.com/static/images/avatar/2.jpg" sx={{ width: 24, height: 24 }} />
          <Typography variant="small" fontWeight={400}>
            {props.data.authorName}
          </Typography>
        </Stack>
        <BsThreeDotsVertical />
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
