import { SearchBar, Tables, TopBar } from '@libs/mui'
import { Avatar, Box, Grid, Typography } from '@mui/material'

export function Index() {
  return (
    <Box>
      <TopBar title="New session" action="back"></TopBar>
      <Box>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Typography fontWeight={700} variant="title3">
              How to read indicators
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Tables content="by Rick Astley" avatar={<Avatar></Avatar>}></Tables>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="large" fontWeight={700} color="#367D7F">
              250
            </Typography>
            <Typography variant="regular" fontWeight={400} color="#367D7F">
              /hr/person
            </Typography>
          </Grid>
          <Grid item xs={12} marginTop={2} marginBottom={2}>
            <Typography variant="regular" fontWeight={400}>
              asdjflskd aslkdfl; k;laskd ksljdklf masm,ndfl kskl jlkjlks kasjdljfkldj lkasjdflksn
              m,id asd ,m ns,m kjsdlfkja m,.ma sdkfj lk
            </Typography>
          </Grid>
          <Grid item xs={12} marginTop={2} marginBottom={2}>
            <Date></Date>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
export default Index
