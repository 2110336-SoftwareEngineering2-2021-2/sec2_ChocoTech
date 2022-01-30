import { ThemeProvider, useTheme } from '@mui/material/styles'

import theme from '../src/config/theme'

const Component = () => {
  const t = useTheme()
  console.log('XXX', t)
  return <>wow</>
}

const ThemeDecorator = (Story) => {
  return (
    <ThemeProvider theme={theme}>
      <Component />
      <Story />
    </ThemeProvider>
  )
}

export const decorators = [ThemeDecorator]
