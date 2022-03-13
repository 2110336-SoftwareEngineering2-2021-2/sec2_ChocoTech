import ConfirmDialog from '@frontend/components/ExpertService/ConfirmDialog'
import { IServiceInformationDTO } from '@libs/api'
import { SearchBar, Tables, TopBar, TopBarActionType } from '@libs/mui'
import { DatePicker, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'

import React, { useEffect } from 'react'

import TagsInput from '../../components/ExpertService/TagInput'

export function Index() {
  const [date, setDate] = React.useState<Date | null>(null)
  const [startTime, setStartTime] = React.useState<Date | null>(null)
  const [endTime, setEndTime] = React.useState<Date | null>(null)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [confirm, setConfirm] = React.useState(false)
  const [serviceData, setServiceData] = React.useState<IServiceInformationDTO>(null)
  useEffect(() => {
    const param = new URLSearchParams(window.location.search)
    const url =
      'http://localhost:3333/api/session/service/' +
      param.get('expert_username') +
      '/' +
      param.get('service_name')
    axios.get(url).then((res) => {
      setServiceData(res.data)
    })
  }, [])
  function handleOpenDialog() {
    setOpenDialog(true)
  }

  function handleCloseDialog(value) {
    setOpenDialog(false)
    setConfirm(value)
    console.log(value)
  }
  function selectedTagsHandler(items) {
    console.log(items)
  }
  function handleSubmit(e) {
    handleOpenDialog()
    e.preventDefault()
  }
  if (serviceData === null) {
    return null
  }
  return (
    <Box display="flex" flexDirection="column" position="relative" minHeight="sm">
      <TopBar title="New session" action={TopBarActionType.Back}></TopBar>
      <Box>
        <form onSubmit={handleSubmit}>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Typography fontWeight={700} variant="title3">
                {serviceData.title}
              </Typography>
            </Grid>
            <Grid item xs={8} marginBottom={2}>
              <Tables
                content={'by ' + serviceData.firstname + ' ' + serviceData.lastname}
                avatar={<Avatar></Avatar>}
              ></Tables>
            </Grid>
            <Grid item xs={4} marginBottom={2} textAlign="right">
              <Typography variant="large" fontWeight={700} color="#367D7F">
                {serviceData.fee}
              </Typography>
              <Typography variant="regular" fontWeight={400} color="#367D7F">
                /hr/person
              </Typography>
            </Grid>
            <Grid item xs={12} marginBottom={3}>
              <Typography variant="regular" fontWeight={400}>
                {serviceData.description}
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
                    {serviceData.fee}
                  </Typography>
                  <Typography variant="regular" fontWeight={400} color="#367D7F">
                    &nbsp; Doji coins
                  </Typography>
                </Grid>
                <Grid item xs={12} marginTop={2} marginBottom={1}>
                  <Button fullWidth type="submit">
                    Schedule
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </form>
      </Box>
      <ConfirmDialog confirm={confirm} isOpen={openDialog} onClose={handleCloseDialog} />
    </Box>
  )
}
export default Index
