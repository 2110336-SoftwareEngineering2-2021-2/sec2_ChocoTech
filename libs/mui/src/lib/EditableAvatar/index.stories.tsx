import { Meta, Story } from '@storybook/react'

import { EditableAvatar, EditableAvatarProps } from '.'

export default {
  component: EditableAvatar,
  title: 'lib/EditableAvatar',
} as Meta<EditableAvatarProps>

const Template: Story<EditableAvatarProps> = (args) => {
  return <EditableAvatar {...args} />
}

export const Ediable = Template.bind({})
Ediable.args = {
  editable: true,
}

export const NotEdiable = Template.bind({})
NotEdiable.args = {
  editable: false,
}

export const Expert = Template.bind({})
Expert.args = {
  isExpert: true,
}
