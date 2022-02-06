import { Meta, Story } from '@storybook/react'

import { useCallback } from 'react'
import { FiGitlab } from 'react-icons/fi'

import Tables, { TablesActionType, TablesProps } from '.'

export default {
  component: Tables,
  title: 'lib/Tables',
  argTypes: {
    content: {
      defaultValue: 'This is content',
      control: { type: 'text' },
    },
    action: {
      defaultValue: 'button',
      options: ['none', 'link', 'button', 'switch'],
      control: { type: 'select' },
    },
    avatar: { control: false },
  },
} as Meta<TablesProps>

const Template: Story = (args) => {
  const { action, ...props } = args

  const transformAction = useCallback(
    (action: string): TablesProps['action'] => {
      switch (action) {
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
      }
      return undefined
    },
    [action],
  )

  return <Tables {...(props as TablesProps)} action={transformAction(action)} />
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
