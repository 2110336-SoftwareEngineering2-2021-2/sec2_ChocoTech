import { TopBarProps } from '@libs/mui'
import { NextPage } from 'next'

export type ExtendedNextPage = NextPage & {
  topBarProps?: TopBarProps
  shouldAuthenticated?: boolean
}

export type PaymentType = 'visa' | 'mastercard'
