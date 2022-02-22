import { TextField } from '@mui/material'

import { Controller, useFormContext } from 'react-hook-form'

function UsernameStep() {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  return (
    <div>
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Username"
            variant="outlined"
            sx={{ marginY: 2 }}
            error={!!errors.username}
            helperText={errors.username ? errors.username?.message : ''}
            fullWidth
          ></TextField>
        )}
      ></Controller>
    </div>
  )
}

export default UsernameStep
