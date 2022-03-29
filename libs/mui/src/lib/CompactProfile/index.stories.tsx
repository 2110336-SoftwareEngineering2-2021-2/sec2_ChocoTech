import { Meta, Story } from '@storybook/react'

import { CompactProfile, CompactProfileProps } from '.'

export default {
  component: CompactProfile,
  title: 'lib/CompactPrpfile',
} as Meta<CompactProfileProps>

const Template: Story<CompactProfileProps> = (args) => {
  return <CompactProfile {...args} />
}

export const Default = Template.bind({})
Default.args = {
  username: 'username',
  displayName: 'Pipat Pimai',
}
