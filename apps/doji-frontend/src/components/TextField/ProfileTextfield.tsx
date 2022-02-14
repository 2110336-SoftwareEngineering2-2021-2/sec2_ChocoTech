import { InputAdornment, TextField, TextFieldProps } from '@mui/material'

type ProfileTextFieldProps = TextFieldProps & {
  adornment: string
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
