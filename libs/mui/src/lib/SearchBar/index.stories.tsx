import { Meta, Story } from '@storybook/react'

import { useRef } from 'react'

import SearchBar, { SearchBarProps, SearchBarRef } from '.'

export default {
  component: SearchBar,
  title: 'lib/SearchBar',
} as Meta<SearchBarProps>

const Template: Story<SearchBarProps> = (args) => {
  const ref = useRef<SearchBarRef>(null)

  return <SearchBar {...args} ref={ref} />
}

export const Default = Template.bind({})
Default.args = {}
