import { Autocomplete, AutocompleteProps, Box, TextField, TextFieldProps } from '@mui/material'

import { useRef, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { CountryType, countries } from './constants'

export interface CountrySelectProps
  extends Omit<
    AutocompleteProps<CountryType, boolean, boolean, boolean>,
    'renderInput' | 'options'
  > {
  register?: UseFormRegisterReturn
  textFieldProps?: TextFieldProps
}

export const CountrySelect: React.FC<CountrySelectProps> = (props) => {
  const defaultCountryCode = 'TH'
  const inputRef = useRef<HTMLInputElement>(null)
  const [countryCode, setCountryCode] = useState(defaultCountryCode.toLocaleLowerCase())

  return (
    <Autocomplete
      {...props}
      options={countries}
      autoHighlight
      defaultValue={countries.find((country) => country.code === defaultCountryCode)}
      getOptionLabel={(option: CountryType) => option.label}
      onChange={(_, value) => {
        if (value && !Array.isArray(value) && typeof value !== 'string') {
          setCountryCode(value.code.toLowerCase())
        } else {
          setCountryCode('')
        }
      }}
      renderOption={(props, option: CountryType) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          {...props.textFieldProps}
          {...props.register}
          // label="Choose a country"
          inputRef={inputRef}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <img
                loading="lazy"
                width={countryCode ? '20' : '0'}
                src={countryCode ? `https://flagcdn.com/w20/${countryCode}.png` : undefined}
                srcSet={countryCode ? `https://flagcdn.com/w40/${countryCode}.png 2x` : undefined}
                alt=""
              />
            ),
          }}
        />
      )}
    />
  )
}
