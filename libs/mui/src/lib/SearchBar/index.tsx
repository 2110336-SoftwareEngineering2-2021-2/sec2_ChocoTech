import { InputAdornment, Stack, TextField, TextFieldProps, useTheme } from '@mui/material'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

export type SearchBarProps = TextFieldProps

type GetFunction = <T = any>(x: keyof HTMLInputElement) => T

export interface SearchBarRef {
  clear: () => void
  get: GetFunction
}

export const SearchBar = forwardRef<SearchBarRef, SearchBarProps>((props, ref) => {
  const theme = useTheme()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleClearText = () => {
    inputRef.current?.focus()
    if (inputRef.current) inputRef.current.value = ''
  }

  const get: GetFunction = (key) => {
    return inputRef?.current?.[key] as any
  }

  useImperativeHandle(
    ref,
    () => ({
      clear: handleClearText,
      get,
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
