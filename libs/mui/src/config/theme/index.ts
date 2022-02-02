import { Theme, ThemeOptions, createTheme, responsiveFontSizes } from '@mui/material'

import overrideComponents from './components'
import paletteOptions from './palette'

const themeOptions: ThemeOptions = {
  palette: paletteOptions,
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
}

function buildTheme(): Theme {
  const _theme = responsiveFontSizes(createTheme(themeOptions))

  _theme.components = overrideComponents(_theme)

  return _theme
}

const theme = buildTheme()

export { theme }
