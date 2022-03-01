import { Meta, Story } from '@storybook/react'

import { FiChevronRight } from 'react-icons/fi'

import { TopBar, TopBarModeType, TopBarProps } from '.'

export default {
  component: TopBar,
  title: 'lib/TopBar',
  argTypes: {
    action: {
      defaultValue: 'back',
      options: ['none', 'back', 'close'],
      control: { type: 'select' },
    },
    avatar: { control: false },
  },
} as Meta<TopBarProps>

const Template: Story<TopBarProps> = (args) => {
  return <TopBar {...args} />
}

export const Default = Template.bind({})
Default.args = {
  title: 'Title',
}

export const Heading = Template.bind({})
Heading.args = {
  title: 'Title',
  mode: TopBarModeType.Heading,
}

export const HeadingWithButton = Template.bind({})
HeadingWithButton.args = {
  title: 'Title',
  mode: TopBarModeType.Heading,
  button: {
    label: 'Button',
    onClick: () => alert('Clicked'),
    endIcon: <FiChevronRight />,
  },
}
