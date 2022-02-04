import { ThemeProvider } from '@mui/material'

import { theme } from '../src/config/theme'

const ThemeDecorator = (Story) => {
  return (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  )
}

export const decorators = [ThemeDecorator]

export const parameters = {
  controls: { expanded: true },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#fff',
      },
      {
        name: 'gray',
        value: '#222',
      },
      {
        name: 'black',
        value: '#000',
      },
      {
        name: 'twitter',
        value: '#00aced',
      },
      {
        name: 'facebook',
        value: '#3b5998',
      },
    ],
  },
}
