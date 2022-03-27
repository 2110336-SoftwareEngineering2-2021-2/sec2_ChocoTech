import { Meta, Story } from '@storybook/react'

import { CompactPrpfile, CompactPrpfileProps } from '.'

export default {
  component: CompactPrpfile,
  title: 'lib/CompactPrpfile',
} as Meta<CompactPrpfileProps>

const Template: Story<CompactPrpfileProps> = (args) => {
  return <CompactPrpfile {...args} />
}

export const Default = Template.bind({})
Default.args = {
  username: 'username',
  displayName: 'Pipat Pimai',
}
