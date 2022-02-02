import { Stack } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import { Meta, Story } from '@storybook/react'

import Typography, { TypographyProps } from '.'

export default {
  component: Typography,
  title: 'Typography',
} as Meta<TypographyProps>

const variants = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'subtitle1',
  'subtitle2',
  'body1',
  'body2',
  'caption',
  'button',
  'title1',
  'title2',
  'title3',
  'large',
  'regular',
  'small',
  'tiny',
] as Variant[]

const weights = [100, 400, 700]

const Template: Story<TypographyProps> = () => {
  return (
    <Stack direction="row" spacing={12}>
      {weights.map((weight) => (
        <div key={weight}>
          <div>W {weight}</div>
          <Stack direction="column" spacing={3}>
            {variants.map((variant) => (
              <Typography key={weight + variant} variant={variant} fontWeight={weight}>
                {variant}
              </Typography>
            ))}
          </Stack>
        </div>
      ))}
    </Stack>
  )
}

export const Default = Template.bind({})
Default.args = {}
