import { BaseTextFieldProps, TextField } from '@mui/material'

import { FC } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'

interface RegisteredTextfieldProps extends BaseTextFieldProps {
  errors: FieldError
}
const RegisteredTextfield: FC<RegisteredTextfieldProps> = (field) => {
  const name = field.name
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <TextField
      {...field}
      label={field.label}
      type={field.type}
      variant="outlined"
      error={!!errors[name]}
      helperText={errors[name]?.message}
      {...register(name)}
      sx={{ marginY: 2 }}
      fullWidth
    />
  )
}

export default RegisteredTextfield
