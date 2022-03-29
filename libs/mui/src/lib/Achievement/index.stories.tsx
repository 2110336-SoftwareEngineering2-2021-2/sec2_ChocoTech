import { Meta, Story } from '@storybook/react'

import { Achievement, AchievementProps } from '.'

export default {
  component: Achievement,
  title: 'lib/Achievement',
} as Meta<AchievementProps>

const Template: Story<AchievementProps> = (args) => {
  return <Achievement {...args} />
}

export const Default = Template.bind({})
Default.args = {
  title: 'Title',
  desc: 'None',
  src: 'https://images.unsplash.com/photo-1568057373189-8bf0cf6179e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  editable: false,
}
