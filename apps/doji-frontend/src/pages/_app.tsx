import { theme } from '@libs/mui'
import { ThemeProvider } from '@mui/material'
import { AppProps } from 'next/app'
import Head from 'next/head'

import './style.css'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Welcome to doji-frontend!</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default CustomApp
