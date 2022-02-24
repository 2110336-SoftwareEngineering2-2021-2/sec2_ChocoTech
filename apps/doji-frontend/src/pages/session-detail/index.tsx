import { SearchBar, Tables, TopBar } from '@libs/mui'
import { DatePicker, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {
  Avatar,
  BottomNavigation,
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import React from 'react'

import TagsInput from './TagInput'

export function Index() {
  const [date, setDate] = React.useState<Date | null>(null)
  const [startTime, setStartTime] = React.useState<Date | null>(null)
  const [endTime, setEndTime] = React.useState<Date | null>(null)
  function selectedTagsHandler(items) {
    console.log(items)
  }
  return (
    <Box display="flex" flexDirection="column" position="relative" minHeight="sm">
      <TopBar title="New session" action="back"></TopBar>
      <Box>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <Typography fontWeight={700} variant="title3">
              How to read indicators
            </Typography>
          </Grid>
          <Grid item xs={8} marginBottom={2}>
            <Tables content="by Rick Astley" avatar={<Avatar></Avatar>}></Tables>
          </Grid>
          <Grid item xs={4} marginBottom={2} textAlign="right">
            <Typography variant="large" fontWeight={700} color="#367D7F">
              250
            </Typography>
            <Typography variant="regular" fontWeight={400} color="#367D7F">
              /hr/person
            </Typography>
          </Grid>
          <Grid item xs={12} marginBottom={3}>
            <Typography variant="regular" fontWeight={400}>
              asdjflskd aslkdfl; k;laskd ksljdklf masm,ndfl kskl jlkjlks kasjdljfkldj lkasjdflksn
              m,id asd ,m ns,m kjsdlfkja m,.ma sdkfj lk
            </Typography>
          </Grid>
          <Grid item xs={12} marginBottom={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newDate) => {
                  setDate(newDate)
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} marginBottom={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Start Time"
                value={startTime}
                onChange={(newTime) => {
                  setStartTime(newTime)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} marginBottom={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="End Time"
                value={endTime}
                onChange={(newTime) => {
                  setEndTime(newTime)
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} marginBottom={2}>
            <Typography variant="large" fontWeight={700}>
              Participants
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TagsInput />
          </Grid>
        </Grid>
        <Box position="relative" bottom={0} left={0} right={0} marginTop={3}>
          <Container sx={{ padding: 2, backgroundColor: 'white' }} maxWidth="sm">
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <Typography variant="large" fontWeight={700}>
                  Total Price
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography variant="large" fontWeight={700} color="#367D7F">
                  500
                </Typography>
                <Typography variant="regular" fontWeight={400} color="#367D7F">
                  &nbsp; Doji coins
                </Typography>
              </Grid>
              <Grid item xs={12} marginTop={2} marginBottom={1}>
                <Button fullWidth>Schedule</Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}
export default Index
