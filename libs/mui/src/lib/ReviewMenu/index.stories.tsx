import { Meta, Story } from '@storybook/react'

import { ReviewMenu, ReviewMenuProps } from '.'

export default {
  component: ReviewMenu,
  title: 'lib/ReviewMenu',
} as Meta<ReviewMenuProps>

const Template: Story<ReviewMenuProps> = (args) => {
  return <ReviewMenu {...args} />
}

export const Default = Template.bind({})
Default.args = {}
