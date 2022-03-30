import ReviewEntry from '@frontend/components/Review/RatingEntry'
import RatingPanel from '@frontend/components/Review/RatingPanel'
import ReviewInput from '@frontend/components/Review/ReviewInput'
import SessionDetail from '@frontend/components/Session/SessionDetail'
import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'
import { ISessionStatResponseDTO } from '@libs/api'
import { Button, CircularProgress, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useQuery } from 'react-query'

const SessionPage: ExtendedNextPage = () => {
  const router = useRouter()
  const sessionId = router.query.id as string
  const { data, isError, isLoading, error } = useQuery<ISessionStatResponseDTO>(
    ['/session', sessionId],
    () => httpClient.get(`/session/${sessionId}`).then((res) => res.data),
  )

  if (isError) return <p>{`Error: ${error}`}</p>

  if (isLoading) return <CircularProgress />

  return (
    <Stack padding="1em" spacing="1em">
      <SessionDetail {...data} />
      <Link href={`/session/schedule/${data.id}`} passHref>
        <Button sx={{ margin: '1em' }}>Schedule</Button>
      </Link>
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
