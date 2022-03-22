import { Meta, Story } from '@storybook/react'

import { NavBar, NavBarProps } from '.'

export default {
  component: NavBar,
  title: 'lib/NavBar',
} as Meta<NavBarProps>

const Template: Story<NavBarProps> = (args) => {
  return <NavBar {...args} />
}

export const Default = Template.bind({})

export const LoggedIn = Template.bind({})
LoggedIn.args = {
  username: 'John Doe',
  role: 'user',
}
