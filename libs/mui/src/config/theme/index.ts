import { ThemeOptions, createTheme } from '@mui/material'

import paletteOptions from './palette'

const themeOptions: ThemeOptions = {
  palette: paletteOptions,
}

export const theme = createTheme(themeOptions)
