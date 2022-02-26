import { Meta, Story } from '@storybook/react'

import { CountrySelect, CountrySelectProps } from '.'

export default {
  component: CountrySelect,
  title: 'lib/CountrySelect',
} as Meta<CountrySelectProps>

const Template: Story<CountrySelectProps> = (args) => {
  return <CountrySelect {...args} />
}

export const Default = Template.bind({})
