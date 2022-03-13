import { MenuItem } from '@mui/material'
import { Meta, Story } from '@storybook/react'

import { useCallback } from 'react'
import { FiGitlab } from 'react-icons/fi'

import { Tables, TablesActionType, TablesProps } from '.'

export default {
  title: 'lib/Tables',
  argTypes: {
    content: {
      defaultValue: 'This is content',
      control: { type: 'text' },
    },
    actionType: {
      defaultValue: 'button',
      options: ['none', 'link', 'button', 'switch', 'menu'],
      control: { type: 'select' },
    },
    avatar: { control: false },
  },
} as Meta

const RenderedMenuItem = (
  <>
    <MenuItem>
      <span>Menu Item 1</span>
    </MenuItem>
    <MenuItem>
      <span>Menu Item 2</span>
    </MenuItem>
  </>
)

const Template: Story = (args) => {
  const { actionType, action, ...props } = args

  const transformAction = useCallback(
    (actionType: string): TablesProps['action'] => {
      switch (actionType) {
        case 'button':
          return {
            type: TablesActionType.Button,
            children: 'Button',
          }
        case 'switch':
          return {
            type: TablesActionType.Switch,
          }
        case 'link':
          return {
            type: TablesActionType.Link,
            text: 'Link',
            href: 'https://www.google.com',
          }
        case 'menu':
          return {
            type: TablesActionType.Menu,
            children: RenderedMenuItem,
          }
      }
      return undefined
    },
    [actionType],
  )

  return (
    <Tables {...(props as TablesProps)} action={!!action ? action : transformAction(actionType)} />
  )
}

export const Default = Template.bind({})
Default.args = {}

export const Avatar = Template.bind({})
Avatar.args = {
  avatar: {
    sx: { bgcolor: 'primary.main' },
    src: 'https://mui.com/static/images/avatar/1.jpg',
    alt: 'Robert William',
    children: 'TY',
    status: 'online',
  },
}

export const Icon = Template.bind({})
Icon.args = {
  avatar: {
    sx: { bgcolor: 'primary.main' },
    children: <FiGitlab />,
    status: 'offline',
  },
}
