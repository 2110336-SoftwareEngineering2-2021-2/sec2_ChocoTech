import { ContainerProps } from '@mui/material'
import { NextPage } from 'next'

import { NavBarProps } from '@libs/mui'

export type ExtendedNextPage = NextPage & {
  dontShowNavBar?: boolean
  navBarProps?: NavBarProps
  containerProps?: ContainerProps
}

export type PaymentType = 'visa' | 'mastercard'
