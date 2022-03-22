import { Meta, Story } from '@storybook/react'

import { Logo } from '.'

export default {
  component: Logo,
  title: 'lib/Logo',
} as Meta

const Template: Story = (args) => {
  return <Logo {...args} />
}

export const Default = Template.bind({})
