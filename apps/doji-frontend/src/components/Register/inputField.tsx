import { TextField } from '@mui/material'
import { FieldConfig, useField } from 'formik'

interface Props extends FieldConfig {
  label: string
}

const InputField = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props)
  return (
    <TextField
      fullWidth
      placeholder={label}
      sx={{ marginY: 2 }}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    ></TextField>
  )
}

export default InputField
