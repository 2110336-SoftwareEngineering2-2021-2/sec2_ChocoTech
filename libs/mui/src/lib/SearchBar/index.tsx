import { Button, InputAdornment, Stack, TextField, TextFieldProps, useTheme } from '@mui/material'

import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

export type SearchBarProps = TextFieldProps

export interface SearchBarRef {
  clear: () => void
  getRef: () => HTMLInputElement | null
}

export const SearchBar = forwardRef<SearchBarRef, SearchBarProps>((props, ref) => {
  const theme = useTheme()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleClearText = () => {
    inputRef.current?.focus()
    if (inputRef.current) inputRef.current.value = ''
  }

  const getRef = () => {
    return inputRef.current
  }

  useImperativeHandle(
    ref,
    () => ({
      clear: handleClearText,
      getRef: getRef,
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
