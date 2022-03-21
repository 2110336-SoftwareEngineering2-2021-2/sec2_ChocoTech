import { ExtendedNextPage } from '@frontend/type'
import { IMeResponseDTO } from '@libs/api'
import { NavBar, theme } from '@libs/mui'
import { Container, ThemeProvider, styled } from '@mui/material'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'

import './style.css'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 600px;
`

type ExtendedAppProps = AppProps & {
  Component: ExtendedNextPage
}

const MainNavBar: React.FC<{ user?: IMeResponseDTO; show?: boolean }> = ({ user, show }) => {
  if (!show) return null
  return <NavBar role={user?.role ? user.role : 'none'} username={user?.username ?? 'username'} />
}

function CustomApp(props: ExtendedAppProps) {
  const { Component, pageProps } = props
  const showNavbar = !Component.dontShowNavBar

  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Welcome to doji-frontend!</title>
        </Head>
        <MainNavBar user={pageProps.user} show={showNavbar} />
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
      <Script src="https://cdn.omise.co/omise.js" />
    </QueryClientProvider>
  )
}

export default CustomApp
