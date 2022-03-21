import ConfirmDialog from '@frontend/components/ExpertService/ConfirmDialog'
import TimePickerController from '@frontend/components/ExpertService/TimePickerController'
import { httpClient } from '@frontend/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { IScheduleSessionDTO, IServiceInformationDTO } from '@libs/api'
import { SearchBar, Tables, TopBar, TopBarActionType } from '@libs/mui'
import { DatePicker, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Avatar, Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import * as yup from 'yup'

import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { useQuery } from 'react-query'

import TagsInput from '../../components/ExpertService/TagInput'

const today = new Date()
today.setHours(0, 0, 0, 0)
const CreateScheduleValidation = yup.object({
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

type ScheduleModel = yup.InferType<typeof CreateScheduleValidation>

function ScheduleSessionPage() {
  const [openDialog, setOpenDialog] = React.useState(false)
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
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ScheduleModel>({
    resolver: yupResolver(CreateScheduleValidation),
    defaultValues: {
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      participants: [],
    },
  })
  let expertUsername: string = ''
  let serviceName: string = ''
  const watchAll = useWatch({ control })
  const { data: serviceData, isLoading } = useQuery(
    ['createSchedule', expertUsername, serviceName],
    async () => {
      const param = new URLSearchParams(window.location.search)
      expertUsername = param.get('expert_username')
      serviceName = param.get('service_name')
      scheduleSessionData.expertUsername = expertUsername
      scheduleSessionData.serviceName = serviceName
      const { data } = await httpClient.get(
        `http://localhost:3333/api/session/service/${expertUsername}/${serviceName}`,
      )
      // Other stuff
      return data
    },
  )
  function handleOpenDialog() {
    setOpenDialog(true)
  }

  function handleCloseDialog(value) {
    setOpenDialog(false)
    if (value) {
      console.log(scheduleSessionData)
    }
  }
  function calculateTotal() {
    const timeDiff = watchAll.endTime.getTime() - watchAll.startTime.getTime()
    const duration = Math.round((timeDiff * 10) / 36e5) / 10
    const total = duration * serviceData.fee * (watchAll.participants.length + 1)
    if (total < 0) {
      return 0
    }
    return total
  }
  const onSubmit: SubmitHandler<ScheduleModel> = async (data) => {
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
  if (!serviceData) {
    return null
  }
  return (
    <Stack display="flex" flexDirection="column" position="relative" minHeight="sm">
      <TopBar title="New session" action={TopBarActionType.Back}></TopBar>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={'column'}>
            <Typography fontWeight={700} variant="title3">
              {serviceData.title}
            </Typography>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Tables
                content={'by ' + serviceData.firstname + ' ' + serviceData.lastname}
                avatar={<Avatar></Avatar>}
              ></Tables>
              <Stack direction={'row'}>
                <Typography variant="large" fontWeight={700} color="primary.dark">
                  {serviceData.fee}
                </Typography>
                <Typography variant="regular" fontWeight={400} color="primary.dark">
                  /hr/person
                </Typography>
              </Stack>
            </Stack>
            <br />
            <Typography variant="regular" fontWeight={400}>
              {serviceData.description}
            </Typography>
            <br />
            <br />
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
            <br />
            <br />
            <Stack direction={'row'}>
              <TimePickerController
                name="startTime"
                control={control}
                register={register}
                registerName="startTime"
                label="Start Time"
                errors={errors.startTime}
              ></TimePickerController>
              <TimePickerController
                name="endTime"
                control={control}
                register={register}
                registerName="endTime"
                label="End Time"
                errors={errors.endTime}
              ></TimePickerController>
            </Stack>
            <br />
            <br />
            <Typography variant="large" fontWeight={700}>
              Participants
            </Typography>
            <br />
            <Controller
              name="participants"
              control={control}
              render={({ field: { onChange, value } }) => <TagsInput onChange={onChange} />}
            ></Controller>
            <br />
          </Stack>
          <Container sx={{ padding: 2, backgroundColor: 'white' }}>
            <Stack alignItems="center" display="flex" direction={'column'}>
              <Container>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Typography variant="large" fontWeight={700}>
                    Total Price
                  </Typography>
                  <Stack direction={'row'}>
                    <Typography variant="large" fontWeight={700} color="primary.dark">
                      {calculateTotal()}
                    </Typography>
                    <Typography variant="regular" fontWeight={400} color="primary.dark">
                      &nbsp; Doji coins
                    </Typography>
                  </Stack>
                </Stack>
              </Container>
              <br />
              <Button fullWidth type="submit">
                Schedule
              </Button>
            </Stack>
          </Container>
        </form>
      </div>
      <ConfirmDialog
        isOpen={openDialog}
        onClose={handleCloseDialog}
        coinAmount={scheduleSessionData.fee}
      />
    </Stack>
  )
}
export default ScheduleSessionPage
