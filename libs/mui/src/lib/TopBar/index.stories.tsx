import { Meta, Story } from '@storybook/react'

import TopBar, { TopBarProps } from '.'

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
