import { NextPage } from 'next'

export type ExtendedNextPage = NextPage & {
  dontShowNavBar?: boolean
}

export type PaymentType = 'visa' | 'mastercard'
