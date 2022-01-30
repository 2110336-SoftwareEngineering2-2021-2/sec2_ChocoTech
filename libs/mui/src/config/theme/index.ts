import { ThemeOptions, createTheme } from '@mui/material'

import paletteOptions from './palette'

const themeOptions: ThemeOptions = {
  palette: paletteOptions,
}

const theme = createTheme(themeOptions)

export default theme
