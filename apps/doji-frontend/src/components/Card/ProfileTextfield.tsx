import { InputAdornment, TextField } from '@mui/material'
import { Divider } from '@mui/material'

function profileTextfield(props) {
  return (
    <div>
      <TextField
        id="filled-hidden-label-normal"
        variant="standard"
        defaultValue={props.defaultValue}
        style={{ color: 'green' }}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <div style={{ color: 'black' }}>{props.Adornment}</div>
            </InputAdornment>
          ),
        }}
      />
      <Divider></Divider>
    </div>
  )
}

export default profileTextfield
