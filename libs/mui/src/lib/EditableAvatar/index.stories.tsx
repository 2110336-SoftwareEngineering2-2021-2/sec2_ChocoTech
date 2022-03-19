import { Meta, Story } from '@storybook/react'

import { EditableAvatar, EditableAvatarProps } from '.'

export default {
  component: EditableAvatar,
  title: 'lib/EditableAvatar',
} as Meta<EditableAvatarProps>

const Template: Story<EditableAvatarProps> = (args) => {
  return <EditableAvatar {...args} />
}

export const Default = Template.bind({})
