import { queryClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage } from '@frontend/type'
import { TopBar, theme } from '@libs/mui'
import { Container, ThemeProvider, styled } from '@mui/material'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

import { useCallback, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClientProvider } from 'react-query'

import './style.css'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 600px;
  margin-top: ${({ theme }) => theme.spacing(4)};
`

type ExtendedAppProps = AppProps & {
  Component: ExtendedNextPage
}

const MainContent: React.FC<ExtendedAppProps> = ({ Component, pageProps, router }) => {
  const { isAuthenticated } = useAuthStore()

  const shouldAuthenticated = Component.shouldAuthenticated

  const shouldRedirect = useCallback(() => {
    return !((shouldAuthenticated && isAuthenticated()) || !shouldAuthenticated)
  }, [shouldAuthenticated, isAuthenticated])

  useEffect(() => {
    if (shouldRedirect()) {
      router.replace('/login')
    }
  }, [router, shouldRedirect])

  if (shouldRedirect()) {
    return null
  }

  return (
    <>
      {Component.topBarProps && <TopBar {...Component.topBarProps} />}
      <Component {...pageProps} />
    </>
  )
}

function CustomApp(props: ExtendedAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Welcome to doji-frontend!</title>
        </Head>
        <StyledContainer maxWidth="sm">
          <MainContent {...props} />
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
      <Script src="https://cdn.omise.co/omise.js" />
    </QueryClientProvider>
  )
}

export default CustomApp
