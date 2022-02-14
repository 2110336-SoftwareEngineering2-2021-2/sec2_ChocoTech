import { InputAdornment, TextField } from '@mui/material'
import { Divider } from '@mui/material'

function profileTextfield(props) {
  return (
    <div>
      <TextField
        id="full-width-filled-hidden-label-normal"
        variant="standard"
        fullWidth
        inputProps={{ style: { textAlign: 'right', padding: '0px' } }}
        defaultValue={props.defaultValue}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start" disablePointerEvents>
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
