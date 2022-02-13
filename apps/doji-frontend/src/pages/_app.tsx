import { theme } from '@libs/mui'
import { ThemeProvider } from '@mui/material'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Index from '.'
import ChangePassword from './ChangePassword'

import './styles.css'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Welcome to doji-frontend!</title>
      </Head>
      <main className="app">
        <ChangePassword></ChangePassword>
      </main>
    </ThemeProvider>
  )
}

export default CustomApp
