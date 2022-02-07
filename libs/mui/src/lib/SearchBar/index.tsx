import { InputAdornment, TextField, TextFieldProps, useTheme } from '@mui/material'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

export type SearchBarProps = TextFieldProps

export interface SearchBarRef extends Partial<HTMLInputElement> {
  clear: () => void
}

export const SearchBar = forwardRef<SearchBarRef, SearchBarProps>((props, ref) => {
  const theme = useTheme()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleClearText = () => {
    inputRef.current?.focus()
    if (inputRef.current) inputRef.current.value = ''
  }

  useImperativeHandle(ref, () => ({
    value: inputRef?.current?.value,
    clear: handleClearText,
    ...inputRef.current,
  }))

  return (
    <TextField
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FiSearch color={theme.palette.grey[500]} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="start" onClick={handleClearText}>
            <FiX color={theme.palette.grey[500]} style={{ cursor: 'pointer' }} />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
})

export default SearchBar
