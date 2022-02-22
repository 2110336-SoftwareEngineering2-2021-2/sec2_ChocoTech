import { TextField } from '@mui/material'

import { Controller, useFormContext } from 'react-hook-form'

function EmailStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  return (
    <div>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            type="email"
            {...field}
            label="Email"
            variant="outlined"
            sx={{ marginY: 2 }}
            error={!!errors.email}
            helperText={errors.email ? errors.email?.message : ''}
            fullWidth
          ></TextField>
        )}
      ></Controller>
    </div>
  )
}

export default EmailStep
