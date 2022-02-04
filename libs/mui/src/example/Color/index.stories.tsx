import { Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material'
import { Meta, Story } from '@storybook/react'

import Color, { ColorProps } from '.'

export default {
  component: Color,
  title: 'example/Color',
} as Meta<ColorProps>

const colors: string[] = ['primary', 'ink', 'sky', 'green', 'red', 'blue', 'yellow']
const type: string[] = ['lightest', 'lighter', 'light', 'main', 'dark', 'darker', 'darkest']

const Template: Story<ColorProps> = () => {
  return (
    <Stack direction="row" spacing={5}>
      {colors.map((color) => (
        <div key={color}>
          <Typography mb={2}>{color}</Typography>
          <Stack direction="column" spacing={2}>
            {type.map((type) => (
              <Color key={`${color}-${type}`} color={`${color}.${type}`} />
            ))}
          </Stack>
        </div>
      ))}
    </Stack>
  )
}

export const Default = Template.bind({})
Default.args = {}
