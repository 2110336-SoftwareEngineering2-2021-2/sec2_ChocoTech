import { LocalizationProvider, TimePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField } from '@mui/material'
import { type } from 'os'

import { Controller } from 'react-hook-form'

function TimePickerController(props) {
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
              <TextField
                {...params}
                error={!!props.errors.startTime}
                helperText={props.errors.startTime?.message}
              />
            )}
          />
        )}
      ></Controller>
    </LocalizationProvider>
  )
}

export default TimePickerController
