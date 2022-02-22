import { TextField } from '@mui/material'

import { Controller, useFormContext } from 'react-hook-form'

function PasswordStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext()
  return (
    <div>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            type="password"
            {...field}
            label="Password"
            variant="outlined"
            sx={{ marginY: 2 }}
            error={!!errors.password}
            helperText={errors.password ? errors.password?.message : ''}
            fullWidth
          ></TextField>
        )}
      ></Controller>
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            type="password"
            {...field}
            label="Confirm Password"
            variant="outlined"
            sx={{ mb: 2 }}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword ? errors.confirmPassword?.message : ''}
            fullWidth
          ></TextField>
        )}
      ></Controller>
    </div>
  )
}

export default PasswordStep
