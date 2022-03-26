import { Meta, Story } from '@storybook/react'
import { mockSessionHistoryData } from 'libs/mui/src/mockData'

import { SessionHistoryCard, SessionHistoryCardProps } from '.'

export default {
  component: SessionHistoryCard,
  title: 'lib/SessionHistoryCard',
} as Meta<SessionHistoryCardProps>

const Template: Story<SessionHistoryCardProps> = (args) => {
  return <SessionHistoryCard {...args} />
}

export const Default = Template.bind({})
Default.args = {
  ...mockSessionHistoryData[0],
}
