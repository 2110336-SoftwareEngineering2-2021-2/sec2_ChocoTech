import { TopBarProps } from '@libs/mui'
import { NextPage } from 'next'

export type ExtendedNextPage = NextPage & {
  topBarProps?: TopBarProps
}
