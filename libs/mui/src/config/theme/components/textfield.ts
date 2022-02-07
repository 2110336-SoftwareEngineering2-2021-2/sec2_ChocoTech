import { Components, Theme } from '@mui/material'

export function overrideTextField(theme: Theme): Components['MuiTextField'] {
  return {
    defaultProps: {
      size: 'small',
    },
  }
}

export function overrideOutlinedInput(theme: Theme): Components['MuiOutlinedInput'] {
  return {
    styleOverrides: {
      notchedOutline: {
        transition: 'border-color 0.2s ease-in-out',
      },
    },
  }
}

export function overrideFilledInput(theme: Theme): Components['MuiFilledInput'] {
  return {
    styleOverrides: {
      root: {
        '&:before, &:after, &:focus, &:hover': {
          borderBottom: 0,
          content: 'none',
        },
        borderRadius: theme.shape.borderRadius,
      },
    },
  }
}
