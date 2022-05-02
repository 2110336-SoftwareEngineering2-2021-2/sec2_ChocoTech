import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Avatar, Button, Container, Stack, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Control, Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import * as yup from 'yup'

import ConfirmDialog from '@frontend/components/ExpertService/ConfirmDialog'
import TagsInput from '@frontend/components/ExpertService/TagInput'
import TimePickerController from '@frontend/components/ExpertService/TimePickerController'
import { httpClient } from '@frontend/services'

import { IScheduleSessionDTO, ISessionResponseDTO } from '@libs/api'
import { Tables } from '@libs/mui'

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
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      sx={{ width: '100%' }}
    >
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
  )
}

export default function ScheduleSessionPage() {
  const router = useRouter()
  const sessionId = router.query.sessionId as string

  const [openDialog, setOpenDialog] = useState(false)
  const [scheduleSessionData, setScheduleSessionData] = useState<IScheduleSessionDTO>({
    sessionId: sessionId,
    duration: 0,
    startTime: new Date(),
    participantsUsername: [],
    coinOnHold: 0,
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

  const {
    data: sessionData,
    isLoading,
    isIdle,
  } = useQuery<ISessionResponseDTO>(
    ['createSchedule', sessionId],
    async () => {
      const { data } = await httpClient.get(`/session/${sessionId}`)
      return data
    },
    {
      enabled: !!sessionId,
    },
  )

  function handleOpenDialog() {
    setOpenDialog(true)
  }

  async function handleCloseDialog(value) {
    setOpenDialog(false)
    try {
      if (value) {
        await httpClient.post('session/schedule/request', scheduleSessionData)
        toast.success('Your schedule is created')
        router.push('/session/history')
      }
    } catch (e) {
      toast.error(e.response.data.message)
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
    let total = duration * sessionData.fee * (data.participants.length + 1)
    if (total < 0) {
      total = 0
    }
    setScheduleSessionData({
      sessionId: sessionId,
      duration: duration,
      startTime: startDate,
      participantsUsername: data.participants.map((element) => element.value),
      coinOnHold: total,
    })
  }

  if (isLoading || isIdle) {
    return null
  }

  return (
    <Stack flexDirection="column" position="relative" minHeight="sm" spacing={3} marginTop={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'} spacing={3}>
          <Typography fontWeight={700} variant="title3">
            {sessionData.topic}
          </Typography>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Tables
              content={'by ' + sessionData.owner.displayName}
              avatar={{
                alt: 'Robert William',
                children: sessionData.owner.firstName?.charAt(0),
                src: sessionData.owner.profilePictureURL,
                sx: {
                  bgcolor: 'primary.main',
                },
              }}
            />
            <Stack direction={'row'}>
              <Typography variant="large" fontWeight={700} color="primary.dark">
                {sessionData.fee}
              </Typography>
              <Typography variant="regular" fontWeight={400} color="primary.dark">
                /hr/person
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="regular" fontWeight={400} pb={4}>
            {sessionData.description}
          </Typography>
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
            />
          </LocalizationProvider>
          <Stack direction={'row'} spacing={2} justifyContent="space-between">
            <TimePickerController
              name="startTime"
              control={control}
              register={register}
              registerName="startTime"
              label="Start Time"
              errors={errors.startTime}
              fullWidth
            />
            <TimePickerController
              name="endTime"
              control={control}
              register={register}
              registerName="endTime"
              label="End Time"
              errors={errors.endTime}
              fullWidth
            />
          </Stack>
          <Typography variant="large" fontWeight={700}>
            Participants
          </Typography>
          <Controller
            name="participants"
            control={control}
            render={({ field: { onChange, value } }) => <TagsInput onChange={onChange} />}
          />
          <Stack direction="column" spacing={5}>
            <TotalPrice control={control} fee={sessionData.fee} />
            <Button fullWidth type="submit">
              Schedule
            </Button>
          </Stack>
        </Stack>
      </form>
      <ConfirmDialog
        isOpen={openDialog}
        onClose={handleCloseDialog}
        coinAmount={scheduleSessionData.coinOnHold}
      />
    </Stack>
  )
}
