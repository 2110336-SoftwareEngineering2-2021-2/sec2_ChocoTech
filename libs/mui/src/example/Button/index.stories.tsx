import { Meta, Story } from '@storybook/react'

import Button, { ButtonProps } from '.'

export default {
  component: Button,
  title: 'Button',
  argTypes: {
    children: {
      defaultValue: 'Hello World',
      control: { type: 'text' },
    },
    startIcon: { control: false },
    endIcon: { control: false },
    sx: { control: false },
    classes: { control: false },
    action: { control: false },
    LinkComponent: { control: false },
  },
} as Meta<ButtonProps>

const Template: Story<ButtonProps> = (args) => {
  return <Button {...args} />
}

export const Default = Template.bind({})
Default.args = {
  children: 'Hello World',
  variant: 'contained',
  color: 'primary',
  size: 'medium',
}
