import {
  FiClock,
  FiFileText,
  FiGitPullRequest,
  FiHome,
  FiLogIn,
  FiLogOut,
  FiMessageSquare,
  FiPlus,
  FiSearch,
  FiSettings,
  FiUserPlus,
  FiUsers,
} from 'react-icons/fi'

import { NavigationListItem } from './types'

export const nonUserListItems: NavigationListItem[] = [
  { type: 'item', href: '/', Icon: FiHome, text: 'Home' },
  { type: 'item', href: '/signup', Icon: FiUserPlus, text: 'Sign up' },
  { type: 'bottom' },
  { type: 'item', href: '/login', Icon: FiLogIn, text: 'Log in' },
]

export const userListItems: NavigationListItem[] = [
  { type: 'item', href: '/session', Icon: FiSearch, text: 'Session' },
  { type: 'item', href: '/profile', Icon: FiUserPlus, text: 'Profile', isInUserMenu: true },
  { type: 'item', href: '/session/history', Icon: FiClock, text: 'History' },
  { type: 'item', href: '/friend', Icon: FiUsers, text: 'Friend' },
  { type: 'item', href: '/chat', Icon: FiMessageSquare, text: 'Chat', isInUserMenu: true },
  { type: 'item', href: '/settings', Icon: FiSettings, text: 'Setting', isInUserMenu: true },
  { type: 'bottom' },
  { type: 'item', href: '/logout', Icon: FiLogOut, text: 'Log out', isInUserMenu: true },
]

export const expertListItems: NavigationListItem[] = [
  { type: 'item', href: '/session', Icon: FiSearch, text: 'Session' },
  { type: 'item', href: '/profile', Icon: FiUserPlus, text: 'Profile', isInUserMenu: true },
  { type: 'item', href: '/session/history', Icon: FiClock, text: 'History' },
  { type: 'item', href: '/friend', Icon: FiUsers, text: 'Friend' },
  { type: 'item', href: '/chat', Icon: FiMessageSquare, text: 'Chat', isInUserMenu: true },
  { type: 'item', href: '/settings', Icon: FiSettings, text: 'Setting', isInUserMenu: true },
  { type: 'header', header: 'Expert Menu' },
  { type: 'item', href: '/session/create', Icon: FiPlus, text: 'New session', isInUserMenu: true },
  {
    type: 'item',
    href: '/session/requests',
    Icon: FiGitPullRequest,
    text: 'Session Request ',
    isInUserMenu: true,
  },
  { type: 'bottom' },
  { type: 'item', href: '/logout', Icon: FiLogOut, text: 'Log out', isInUserMenu: true },
]

export const adminListItems: NavigationListItem[] = [
  { type: 'item', href: '/admin/request', Icon: FiFileText, text: 'Expert Request' },
  { type: 'item', href: '/admin/new', Icon: FiUserPlus, text: 'Create Admin' },
  { type: 'bottom' },
  { type: 'item', href: '/logout', Icon: FiLogOut, text: 'Log out' },
]
