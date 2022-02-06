import { InputAdornment, TextField } from '@mui/material'
import { Divider } from '@mui/material'

function profileTextfieldDisabled(props) {
  return (
    <div>
      <TextField
        id="filled-hidden-label-read-only-input"
        variant="standard"
        fullWidth
        inputProps={{ style: { textAlign: 'right' } }}
        defaultValue={props.defaultValue}
        disabled
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <div style={{ color: 'grey' }}>{props.Adornment}</div>
            </InputAdornment>
          ),
        }}
      />
      <Divider></Divider>
    </div>
  )
}

export default profileTextfieldDisabled
