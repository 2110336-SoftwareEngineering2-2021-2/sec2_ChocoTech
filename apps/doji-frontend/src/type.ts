import { NextPage } from 'next'

export type ExtendedNextPage = NextPage & {
  dontShowNavBar?: boolean
  shouldAuthenticated?: boolean
}

export type PaymentType = 'visa' | 'mastercard'
