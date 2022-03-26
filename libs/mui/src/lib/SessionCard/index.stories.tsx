import { Meta, Story } from '@storybook/react'

import { SessionCard, SessionCardProps } from '.'

export default {
  component: SessionCard,
  title: 'lib/SessionCard',
} as Meta<SessionCardProps>

const Template: Story<SessionCardProps> = (args) => {
  return <SessionCard {...args} />
}

export const Default = Template.bind({})
Default.args = {
  topic: 'Hello',
  expertName: 'username',
  price: 10,
  profileImageURL: 'https://mui.com/static/images/avatar/1.jpg',
}
