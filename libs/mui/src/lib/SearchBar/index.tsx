import { Button, InputAdornment, Stack, TextField, TextFieldProps, useTheme } from '@mui/material'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

export type SearchBarProps = TextFieldProps

export interface SearchBarRef {
  clear: () => void
  getValue: () => string | undefined
}

export const SearchBar = forwardRef<SearchBarRef, SearchBarProps>((props, ref) => {
  const theme = useTheme()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleClearText = () => {
    inputRef.current?.focus()
    if (inputRef.current) inputRef.current.value = ''
  }

  const getValue = () => {
    return inputRef.current?.value
  }

  useImperativeHandle(
    ref,
    () => ({
      clear: handleClearText,
      getValue: getValue,
    }),
    [],
  )

  return (
    <Stack direction="row" spacing={1} justifyContent="space-between">
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
        fullWidth
        {...props}
      />
    </Stack>
  )
})
