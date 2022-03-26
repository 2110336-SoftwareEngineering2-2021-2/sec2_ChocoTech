import { IReviewStat } from '@libs/api'
import { Grid, LinearProgress, Stack, Typography, useTheme } from '@mui/material'

import { Fragment } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

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
          <Fragment key={rank}>
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
          </Fragment>
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

export default RatingPanel
