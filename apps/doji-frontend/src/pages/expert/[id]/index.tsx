import RatingPanel from '@frontend/components/Review/RatingPanel'
import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'
import { IExpertInfoDTO } from '@libs/api'
import { Avatar, CircularProgress, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { useRouter } from 'next/router'

import { useQuery } from 'react-query'

const ExpertPage: ExtendedNextPage = () => {
  //TODO This Entire Page
  const router = useRouter()
  const { id } = router.query
  const { isError, error, isLoading, data } = useQuery<IExpertInfoDTO>(['/expert/info', id], () =>
    httpClient.get('/expert/info/' + encodeURIComponent(id as string)).then((res) => res.data),
  )

  if (isError) return <div>{`Error: ${error}`}</div>

  if (isLoading) return <CircularProgress />

  return (
    <Stack px="1em">
      <Stack direction="row" spacing="2em" m="1em">
        <Avatar src="https://picsum.photos/id/1005/5760/3840" sx={{ width: 80, height: 80 }} />
        <Typography variant="title2" textAlign="center" py="0.5em">
          Thanapoom
        </Typography>
      </Stack>

      <Typography fontWeight={500} color="sky.main">
        Ranking and reviews
      </Typography>

      <RatingPanel reviewStat={data.reviewStat} />
    </Stack>
  )
}

export default ExpertPage
