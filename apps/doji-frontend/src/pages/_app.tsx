import { theme } from '@libs/mui'
import { Container, ThemeProvider, styled } from '@mui/material'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'

import './style.css'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 600px;
  margin-top: ${({ theme }) => theme.spacing(4)};
`

const queryClient = new QueryClient()

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Welcome to doji-frontend!</title>
        </Head>
        <StyledContainer maxWidth="sm">
          <Component {...pageProps} />
        </StyledContainer>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontFamily: ['Inter', 'sans-serif'].join(','),
            },
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default CustomApp
