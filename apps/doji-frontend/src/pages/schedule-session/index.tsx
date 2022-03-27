import ConfirmDialog from '@frontend/components/ExpertService/ConfirmDialog'
import TimePickerController from '@frontend/components/ExpertService/TimePickerController'
import { httpClient } from '@frontend/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { IScheduleSessionDTO, IServiceInformationDTO } from '@libs/api'
import { Tables } from '@libs/mui'
import { DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Avatar, Button, Container, Stack, TextField, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import * as yup from 'yup'

import { useState } from 'react'
import { Control, Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
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

const TotalPrice = ({ control, fee }: { control: Control<ScheduleModel>; fee: number }) => {
  const { endTime, startTime, participants } = useWatch({ control })

  function calculateTotal() {
    const timeDiff = endTime.getTime() - startTime.getTime()
    const duration = Math.round((timeDiff * 10) / 36e5) / 10
    const total = duration * fee * (participants.length + 1)
    if (total < 0) {
      return 0
    }
    return total
  }

  return (
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
  )
}

interface ScheduleSessionPageProps {
  expertUsername: string
  serviceName: string
}

export default function ScheduleSessionPage({
  expertUsername,
  serviceName,
}: ScheduleSessionPageProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const [scheduleSessionData, setScheduleSessionData] = useState<IScheduleSessionDTO>({
    fee: 0,
    expertUsername: expertUsername,
    serviceName: serviceName,
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

  const { data: serviceData, isLoading } = useQuery<IServiceInformationDTO>(
    ['createSchedule', expertUsername, serviceName],
    async () => {
      const { data } = await httpClient.get(`/session/service/${expertUsername}/${serviceName}`)
      return data
    },
  )

  function handleOpenDialog() {
    setOpenDialog(true)
  }

  async function handleCloseDialog(value) {
    setOpenDialog(false)
    if (value) {
      await toast.promise(httpClient.post('session/schedule', scheduleSessionData), {
        loading: 'Loading...',
        success: 'Your session has been scheduled.',
        error: 'An error occur',
      })
    }
  }

  const onSubmit: SubmitHandler<ScheduleModel> = async (data) => {
    handleOpenDialog()
    const timeDiff = data.endTime.getTime() - data.startTime.getTime()
    const duration = Math.round((timeDiff * 10) / 36e5) / 10
    const startDate = new Date(data.date)
    startDate.setHours(
      data.startTime.getHours(),
      data.startTime.getMinutes(),
      data.startTime.getSeconds(),
    )
    setScheduleSessionData({
      fee: duration * serviceData.fee * (data.participants.length + 1),
      expertUsername: scheduleSessionData.expertUsername,
      serviceName: scheduleSessionData.serviceName,
      duration: duration,
      startTime: startDate,
      participantsUsername: data.participants.map((element) => element.value),
    })
  }

  if (isLoading) {
    return null
  }

  return (
    <Stack flexDirection="column" position="relative" minHeight="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'}>
          <br />

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
        <Stack alignItems="center" display="flex" direction={'column'} p={2} sx={{ bg: 'white' }}>
          <TotalPrice control={control} fee={serviceData.fee} />
          <br />
          <Button fullWidth type="submit">
            Schedule
          </Button>
        </Stack>
      </form>
      <ConfirmDialog
        isOpen={openDialog}
        onClose={handleCloseDialog}
        coinAmount={scheduleSessionData.fee}
      />
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query
  return {
    props: {
      expertUsername: query.expert_username,
      serviceName: query.service_name,
    },
  }
}
