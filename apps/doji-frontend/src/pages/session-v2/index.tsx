import { ExtendedNextPage } from '@frontend/type'
import {
  Avatar,
  Button,
  Grid,
  LinearProgress,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import { Box } from '@mui/system'

import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'

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

function RatingPanel() {
  const theme = useTheme()

  return (
    <Stack direction="row" alignItems="center" py="1em">
      <Stack px="1em">
        <Typography variant="title2" fontWeight={700}>
          4.6
        </Typography>
        <Typography fontWeight={400}>from 5</Typography>
      </Stack>
      <Grid container alignItems="center" columnSpacing="0.5em" lineHeight="0.9em">
        {[5, 4, 3, 2, 1].map((rank) => (
          <>
            <Grid item xs={3} textAlign="right">
              {Array(rank)
                .fill(0)
                .map(() => (
                  <AiFillStar color={theme.palette.primary.dark} />
                ))}
            </Grid>
            <Grid item xs={9}>
              <LinearProgress variant="determinate" value={90} />
            </Grid>
          </>
        ))}

        <Grid item xs={12} textAlign="right">
          <Typography variant="small" fontWeight={400}>
            250 reviews
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

function ReviewEntry() {
  const theme = useTheme()
  return (
    <Stack py="1em" spacing="0.75em">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing="0.5em" alignItems="center">
          <Avatar src="/static/images/avatar/2.jpg" sx={{ width: 24, height: 24 }} />
          <Typography variant="small" fontWeight={400}>
            Angelina Joey
          </Typography>
        </Stack>
        <BsThreeDotsVertical />
      </Stack>
      <Stack direction="row" alignItems="center" spacing="2em">
        <Stack direction="row">
          {Array(4)
            .fill(0)
            .map(() => (
              <AiFillStar color={theme.palette.primary.dark} />
            ))}
          <AiOutlineStar color={theme.palette.primary.dark} />
        </Stack>
        <Typography variant="tiny" fontWeight={400} color="ink.light">
          17 hours ago
        </Typography>
      </Stack>
      <Typography variant="small" fontWeight={400}>
        The World Health Organization (WHO) and the International Development Innovation Alliance...
      </Typography>
    </Stack>
  )
}

const SessionPage: ExtendedNextPage = () => {
  return (
    <Stack padding="1em" spacing="1em">
      <SessionDetail />
      <Button sx={{ margin: '1em' }}>Schedule</Button>
      <Typography color="sky.main" fontWeight={500}>
        Rating and Review
      </Typography>
      <RatingPanel />
      <ReviewInput />
      <ReviewEntry />
      <ReviewEntry />

      <Link component="button" onClick={() => console.log('hi')}>
        <Typography fontWeight={500} color="primary.main" textAlign="center">
          view more
        </Typography>
      </Link>
    </Stack>
  )
}

export default SessionPage
