import { TextField, TextFieldProps } from '@mui/material'

import { FC } from 'react'
import { FieldError, useFormContext } from 'react-hook-form'

export type RegisteredTextfieldProps = TextFieldProps & {
  errors: FieldError
}
const RegisteredTextfield: FC<RegisteredTextfieldProps> = ({ errors, ...props }) => {
  const name = props.name

  return (
    <TextField
      {...props}
      error={!!errors}
      helperText={errors?.message}
      sx={{ marginY: 2, ...props.sx }}
      fullWidth
    />
  )
}
export default RegisteredTextfield
