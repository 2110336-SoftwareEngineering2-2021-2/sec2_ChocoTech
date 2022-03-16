import ConfirmDialog from '@frontend/components/ExpertService/ConfirmDialog'
import { yupResolver } from '@hookform/resolvers/yup'
import { IScheduleSessionDTO, IServiceInformationDTO } from '@libs/api'
import { SearchBar, Tables, TopBar, TopBarActionType } from '@libs/mui'
import { DatePicker, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios'
import * as yup from 'yup'

import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import TagsInput from '../../components/ExpertService/TagInput'

const today = new Date()
today.setHours(0, 0, 0, 0)
const createScheduleValidation = yup.object({
  date: yup
    .date()
    .typeError('This date is invalid')
    .required('Please enter the date.')
    .min(today, 'The date is invalid'),
  startTime: yup
    .date()
    .typeError('The start time is invalid')
    .required('Please enter the start time'),
  endTime: yup
    .date()
    .typeError('The end time is invalid')
    .required('Please enter the start end')
    .min(yup.ref('startTime'), 'End time must be after start time'),
  participants: yup.array(),
})

type scheduleModel = yup.InferType<typeof createScheduleValidation>

export function Index() {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [confirm, setConfirm] = React.useState(false)
  const [serviceData, setServiceData] = React.useState<IServiceInformationDTO>(null)
  const [scheduleSessionData, setscheduleSessionData] = React.useState<IScheduleSessionDTO>({
    fee: 0,
    expertUsername: '',
    serviceName: '',
    duration: 0,
    startTime: new Date(),
    participantsUsername: [],
  })
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<scheduleModel>({
    resolver: yupResolver(createScheduleValidation),
    defaultValues: {
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      participants: [],
    },
  })
  const watchAll = watch()
  useEffect(() => {
    const param = new URLSearchParams(window.location.search)
    scheduleSessionData.expertUsername = param.get('expert_username')
    scheduleSessionData.serviceName = param.get('service_name')
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
    if (value) {
      console.log(scheduleSessionData)
    }
  }
  function selectedTagsHandler(items) {
    console.log(items)
  }
  function calculateTotal() {
    const timeDiff = watchAll.endTime.getTime() - watchAll.startTime.getTime()
    const duration = Math.round((timeDiff * 10) / 36e5) / 10
    return duration * serviceData.fee * (watchAll.participants.length + 1)
  }
  const onSubmit: SubmitHandler<scheduleModel> = async (data) => {
    handleOpenDialog()
    const timeDiff = data.endTime.getTime() - data.startTime.getTime()
    scheduleSessionData.duration = Math.round((timeDiff * 10) / 36e5) / 10
    const startDate = new Date(data.date)
    startDate.setHours(
      data.startTime.getHours(),
      data.startTime.getMinutes(),
      data.startTime.getSeconds(),
    )
    scheduleSessionData.startTime = startDate
    scheduleSessionData.fee =
      scheduleSessionData.duration * serviceData.fee * (data.participants.length + 1)
    scheduleSessionData.participantsUsername = data.participants.map((element) => {
      return element.value
    })
  }
  if (serviceData === null) {
    return null
  }
  return (
    <Box display="flex" flexDirection="column" position="relative" minHeight="sm">
      <TopBar title="New session" action={TopBarActionType.Back}></TopBar>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                <Controller
                  name="date"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DatePicker
                      {...register('date')}
                      disablePast
                      label="Date"
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.date}
                          helperText={errors.date?.message}
                          fullWidth
                        />
                      )}
                    />
                  )}
                ></Controller>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} marginBottom={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TimePicker
                      {...register('startTime')}
                      label="Start Time"
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.startTime}
                          helperText={errors.startTime?.message}
                        />
                      )}
                    />
                  )}
                ></Controller>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} marginBottom={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name="endTime"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TimePicker
                      {...register('endTime')}
                      label="End Time"
                      value={value}
                      onChange={onChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.endTime}
                          helperText={errors.endTime?.message}
                        />
                      )}
                    />
                  )}
                ></Controller>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} marginBottom={2}>
              <Typography variant="large" fontWeight={700}>
                Participants
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="participants"
                control={control}
                render={({ field: { onChange, value } }) => <TagsInput onChange={onChange} />}
              ></Controller>
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
                    {calculateTotal()}
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
      <ConfirmDialog
        confirm={confirm}
        isOpen={openDialog}
        onClose={handleCloseDialog}
        coinAmount={scheduleSessionData.fee}
      />
    </Box>
  )
}
export default Index
