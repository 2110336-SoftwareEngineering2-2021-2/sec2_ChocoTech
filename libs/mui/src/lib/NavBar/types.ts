import { IconType } from 'react-icons/lib'

export type NavigationListItemItem = {
  type: 'item'
  href: string
  Icon: IconType
  text: string
  isInUserMenu?: boolean
}

export type NavigationListItemHeader = {
  type: 'header'
  header: string
}

export type NavigationListItem =
  | NavigationListItemItem
  | NavigationListItemHeader
  | {
      type: 'bottom'
    }
