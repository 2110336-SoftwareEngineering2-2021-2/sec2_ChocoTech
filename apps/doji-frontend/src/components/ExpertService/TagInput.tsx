import { Tables } from '@libs/mui'
import { Autocomplete, Avatar, Chip, TextField } from '@mui/material'

const friendList = [
  {
    value: 'incredible',
    text: 'Mr.Incredible',
  },
  {
    value: 'yeltsa',
    text: 'Yeltsa Kcir',
  },
  {
    value: 'john',
    text: 'John green',
  },
  {
    value: 'jonathan',
    text: 'Jonathan Dessner',
  },
]
export default function TagsInput(props) {
  return (
    <div>
      <Autocomplete
        onChange={(event, value) => {
          props.onChange(value)
        }}
        filterSelectedOptions={true}
        multiple
        options={friendList}
        getOptionLabel={(option) => option.text}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={option.value}
              variant="outlined"
              label={option.text}
              avatar={<Avatar></Avatar>}
              {...getTagProps({ index })}
            ></Chip>
          ))
        }
        renderInput={(params) => <TextField {...params}></TextField>}
        renderOption={(props, option, { selected }) => (
          <li {...props} id={option.value}>
            <Tables content={option.text} avatar={<Avatar></Avatar>}></Tables>
          </li>
        )}
      ></Autocomplete>
    </div>
  )
}
