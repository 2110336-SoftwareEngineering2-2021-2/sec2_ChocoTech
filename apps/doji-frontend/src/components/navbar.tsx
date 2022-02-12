import { ArrowBackIosNewRounded, CloseRounded } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import Link from 'next/link'

const Navbar = (props) => {
  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="center" py={1.5}>
      <Grid item sm={4}>
        <Link href={props.href} passHref>
          <a>{props.action === 'back' ? <ArrowBackIosNewRounded /> : <CloseRounded />}</a>
        </Link>
      </Grid>
      <Grid item sm={4} textAlign="center">
        <Typography variant="large" fontWeight={400}>
          {props.title}
        </Typography>
      </Grid>
      <Grid item sm={4}></Grid>
    </Grid>
  )
}

export default Navbar
