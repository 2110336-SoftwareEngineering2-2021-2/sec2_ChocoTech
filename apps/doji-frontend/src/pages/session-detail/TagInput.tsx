import { Tables } from '@libs/mui'
import { Autocomplete, Avatar, Chip, TextField } from '@mui/material'

const friendList = [
  {
    value: '1',
    text: 'Mr.Incredible',
  },
  {
    value: '2',
    text: 'Yeltsa Kcir',
  },
  {
    value: '3',
    text: 'Super Idol',
  },
  {
    value: '4',
    text: 'Ricardo',
  },
]
export default function TagsInput() {
  return (
    <div>
      <Autocomplete
        filterSelectedOptions={true}
        multiple
        options={friendList}
        getOptionLabel={(option) => option.text}
        key={(option) => option.value}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
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
