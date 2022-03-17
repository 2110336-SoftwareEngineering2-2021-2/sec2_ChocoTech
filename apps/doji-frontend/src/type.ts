import { NextPage } from 'next'

export type ExtendedNextPage = NextPage & {
  showNavBar?: boolean
  shouldAuthenticated?: boolean
}

export type PaymentType = 'visa' | 'mastercard'
