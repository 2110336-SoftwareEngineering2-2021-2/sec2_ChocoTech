import { LocalizationProvider, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material'
import { type } from 'os'

import { useEffect, useState } from 'react'
import { Control, Controller, UseFormRegister } from 'react-hook-form'

export type TimePickerControllerProps = {
  name: string
  control: Control<any>
  register: UseFormRegister<any>
  registerName: string
  label: string
  errors: any
}

function TimePickerController(props: TimePickerControllerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={props.name}
        control={props.control}
        render={({ field: { onChange, value } }) => (
          <TimePicker
            {...props.register(props.registerName)}
            label={props.label}
            value={value}
            onChange={onChange}
            renderInput={(params) => (
              <TextField {...params} error={!!props.errors} helperText={props.errors?.message} />
            )}
          />
        )}
      ></Controller>
    </LocalizationProvider>
  )
}

export default TimePickerController
