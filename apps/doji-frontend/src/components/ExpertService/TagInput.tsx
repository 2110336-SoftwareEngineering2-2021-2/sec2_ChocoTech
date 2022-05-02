import { Autocomplete, Avatar, Chip, TextField } from '@mui/material'
import { type } from 'os'

import { Tables } from '@libs/mui'

export interface IFriendSuggestion {
  value: string
  profileImageURL: string
}

export type TagInputProps = {
  onChange: (value: (string | IFriendSuggestion)[]) => void
  friendList: IFriendSuggestion[]
}

export default function TagsInput(props: TagInputProps) {
  return (
    <div>
      <Autocomplete
        onChange={(event, value) => {
          props.onChange(value)
        }}
        filterSelectedOptions={true}
        multiple
        options={props.friendList}
        getOptionLabel={(option) => option.value}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={option.value}
              variant="outlined"
              label={option.value}
              avatar={<Avatar src={option.profileImageURL} alt={option.value}></Avatar>}
              {...getTagProps({ index })}
            ></Chip>
          ))
        }
        renderInput={(params) => <TextField {...params}></TextField>}
        renderOption={(props, option, { selected }) => (
          <li {...props} id={option.value}>
            <Tables
              content={option.value}
              avatar={{
                alt: 'Robert William',
                children: option.value.charAt(0),
                src: option.profileImageURL,
                sx: {
                  bgcolor: 'primary.main',
                },
              }}
            ></Tables>
          </li>
        )}
      ></Autocomplete>
    </div>
  )
}
