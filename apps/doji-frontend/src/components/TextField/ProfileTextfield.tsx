import { InputAdornment, TextField, TextFieldProps } from '@mui/material'

type ProfileTextFieldProps = TextFieldProps & {
  adornment: string
  readOnly: boolean
}
function ProfileTextfield(props: ProfileTextFieldProps) {
  return (
    <TextField
      variant="standard"
      fullWidth
      inputProps={{ style: { textAlign: 'right' } }}
      defaultValue={props.defaultValue}
      InputProps={{
        disableUnderline: true,
        readOnly: props.readOnly,
        startAdornment: (
          <InputAdornment position="start" disablePointerEvents>
            <div style={{ color: 'black' }}>{props.adornment}</div>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}

export default ProfileTextfield
