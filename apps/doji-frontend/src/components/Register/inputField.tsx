import { TextField } from '@mui/material'
import { FieldConfig, useField } from 'formik'

import React from 'react'

interface Props extends FieldConfig {
  label: string
}

const InputField = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props)
  return (
    <TextField
      fullWidth
      label={label}
      margin="dense"
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    ></TextField>
  )
}

export default InputField
