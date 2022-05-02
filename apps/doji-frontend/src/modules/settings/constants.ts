import { AiOutlineGooglePlus } from 'react-icons/ai'
import { FiDollarSign, FiEdit2, FiLayers, FiLock, FiLogOut } from 'react-icons/fi'
import { IconType } from 'react-icons/lib'

export interface ListItemProps {
  href: string
  text: string
  icon: IconType
}

export const listItems: ListItemProps[] = [
  {
    href: '/settings/profile',
    text: 'Edit profile',
    icon: FiEdit2,
  },
  {
    href: '/change-password',
    text: 'Change password',
    icon: FiLock,
  },
  {
    href: '/balance',
    text: 'Wallet',
    icon: FiDollarSign,
  },
  {
    href: '/settings/experience',
    text: 'Experience',
    icon: FiLayers,
  },
  {
    href: '/api/auth/google',
    text: 'Link with Google',
    icon: AiOutlineGooglePlus,
  },
  {
    href: '/logout',
    text: 'Logout',
    icon: FiLogOut,
  },
]
