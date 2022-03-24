import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'
import { IPublicSessionReviewDTO, IReviewStat, ISessionInformationDTO } from '@libs/api'
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { Box } from '@mui/system'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/router'

import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useQuery } from 'react-query'

function SessionDetail() {
  return (
    <Box>
      <Stack direction="row" py="0.5em" justifyContent="space-between">
        <Stack spacing="0.5em">
          <Typography variant="large" fontWeight={700}>
            From 1M to 1K, How did I do it?
          </Typography>
          <Stack direction="row" spacing="0.5em">
            <Avatar src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} />
            <Typography variant="small" fontWeight={400}>
              by{' '}
              <Typography variant="small" fontWeight={500}>
                Poravee Binhayeearason
              </Typography>
            </Typography>
          </Stack>
        </Stack>
        <Stack textAlign="right">
          <Typography variant="large" fontWeight={700} color="primary.dark">
            250
          </Typography>
          <Typography color="primary.dark">/hr/person</Typography>
        </Stack>
      </Stack>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl, aliquet fringilla sed vitae
        amet nisl. Nullam donec molestie duis eu, neque convallis ipsum, congue.
      </Typography>
    </Box>
  )
}

function RatingPanel(props: { reviewStat: IReviewStat }) {
  const theme = useTheme()

  return (
    <Stack direction="row" alignItems="center" py="1em">
      <Stack px="1em">
        <Typography variant="title2" fontWeight={700}>
          {props.reviewStat.avg.toFixed(2)}
        </Typography>
        <Typography fontWeight={400}>from 5</Typography>
      </Stack>
      <Grid container alignItems="center" columnSpacing="0.5em" lineHeight="0.9em">
        {[5, 4, 3, 2, 1].map((rank) => (
          <React.Fragment key={rank}>
            <Grid item xs={3} textAlign="right">
              {Array(rank)
                .fill(0)
                .map((_, i) => (
                  <AiFillStar color={theme.palette.primary.dark} key={i} />
                ))}
            </Grid>
            <Grid item xs={9}>
              <LinearProgress
                variant="determinate"
                value={
                  props.reviewStat.count > 0
                    ? (100 * props.reviewStat[String(rank)]) / props.reviewStat.count
                    : 0
                }
              />
            </Grid>
          </React.Fragment>
        ))}

        <Grid item xs={12} textAlign="right">
          <Typography variant="small" fontWeight={400}>
            {props.reviewStat.count} reviews
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  )
}

function ReviewInput() {
  return (
    <Stack direction="row" spacing="1em" alignItems="center">
      <Avatar src="/static/images/avatar/1.jpg" sx={{ width: 40, height: 40 }} />
      <TextField fullWidth label="Review the session..." />
    </Stack>
  )
}

function ReviewEntry(props: { data: IPublicSessionReviewDTO }) {
  const theme = useTheme()
  return (
    <Stack py="1em" spacing="0.75em">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing="0.5em" alignItems="center">
          <Avatar src="/static/images/avatar/2.jpg" sx={{ width: 24, height: 24 }} />
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

const SessionPage: ExtendedNextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, isError, isLoading, error } = useQuery<ISessionInformationDTO>(
    ['/session/session/', id],
    () =>
      httpClient
        .get(`/session/session/${encodeURIComponent(id as string)}`)
        .then((res) => res.data),
  )

  if (isError) return <p>{`Error: ${error}`}</p>

  if (isLoading) return <CircularProgress />

  return (
    <Stack padding="1em" spacing="1em">
      <SessionDetail />
      <Button sx={{ margin: '1em' }}>Schedule</Button>
      <Typography color="sky.main" fontWeight={500}>
        Rating and Review
      </Typography>
      <RatingPanel reviewStat={data.reviewStat} />
      <ReviewInput />
      {data.reviews.map((review) => (
        <ReviewEntry key={review.id} data={review} />
      ))}
    </Stack>
  )
}

export default SessionPage
