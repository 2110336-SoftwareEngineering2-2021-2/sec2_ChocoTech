import { TextField, TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'
import { FieldError } from 'react-hook-form'

export type RegisteredTextfieldProps = TextFieldProps & {
  errors: FieldError
}
const RegisteredTextfield = forwardRef<HTMLInputElement, RegisteredTextfieldProps>(
  ({ errors, ...rest }, ref) => {
    return (
      <TextField
        {...rest}
        error={!!errors}
        helperText={errors?.message}
        sx={{ marginY: 2, ...rest.sx }}
        ref={ref}
        fullWidth
      />
    )
  },
)
RegisteredTextfield.displayName = 'RegisteredTextfield'
export default RegisteredTextfield
