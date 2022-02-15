import { theme } from '@libs/mui'
import { Container, ThemeProvider, styled } from '@mui/material'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { Toaster } from 'react-hot-toast'

import './style.css'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 600px;
`

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Welcome to doji-frontend!</title>
      </Head>
      <StyledContainer maxWidth="sm">
        <Component {...pageProps} />
        <Toaster position="bottom-center" reverseOrder={false} />
      </StyledContainer>
    </ThemeProvider>
  )
}

export default CustomApp
