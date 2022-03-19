import { Meta, Story } from '@storybook/react'

import { UserBar, UserBarProps } from '.'
import { expertListItems, userListItems } from '../NavBar/constants'

export default {
  component: UserBar,
  title: 'lib/UserBar',
  argTypes: {
    isLoggedIn: {
      control: {
        type: 'boolean',
      },
    },
    username: {
      defaultValue: 'Pipat',
    },
  },
} as Meta<UserBarProps>

const Template: Story<UserBarProps> = (args) => {
  return <UserBar {...args} />
}

export const WithAvatar = Template.bind({})
WithAvatar.args = {
  isLoggedIn: true,
  items: userListItems,
  avartarSrc: 'https://mui.com/static/images/avatar/1.jpg',
}

export const WithAvatarExpert = Template.bind({})
WithAvatarExpert.args = {
  isLoggedIn: true,
  items: expertListItems,
  avartarSrc: 'https://mui.com/static/images/avatar/1.jpg',
}
