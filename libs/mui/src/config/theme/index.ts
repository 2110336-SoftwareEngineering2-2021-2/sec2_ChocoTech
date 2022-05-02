import { Theme, ThemeOptions, createTheme, responsiveFontSizes } from '@mui/material'

import overrideComponents from './components'
import paletteOptions from './palette'

const overrideShadows = () => {
  const defaultTheme = createTheme()

  const shadows = defaultTheme.shadows
  shadows[1] = '0px 2px 8px rgba(0, 0, 0, 0.16)'
  shadows[2] = '0px 2px 8px rgba(0, 0, 0, 0.20)'

  return shadows
}

const themeOptions: ThemeOptions = {
  palette: paletteOptions,
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
    fontSize: 14,
  },
  shape: {
    borderRadius: 8,
  },
  shadows: overrideShadows(),
}

function buildTheme(): Theme {
  const _theme = responsiveFontSizes(createTheme(themeOptions))

  _theme.components = overrideComponents(_theme)

  return _theme
}

const theme = buildTheme()

export { theme }
