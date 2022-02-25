import Storage from '@frontend/common/storage'
import { StorageKey } from '@frontend/common/storage/constants'
import { httpClient, queryClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage } from '@frontend/type'
import { IMeResponseDTO } from '@libs/api'
import { TopBar, theme } from '@libs/mui'
import { Container, ThemeProvider, styled } from '@mui/material'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

import { useEffect, useState } from 'react'
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

function CustomApp({ Component, pageProps, router }: ExtendedAppProps) {
  const { setUser } = useAuthStore()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const shouldAuthenticated = Component.shouldAuthenticated

  /**
   * Initialize user data from local storage and check if user is logged in,
   * it'll be run only once when the app is loaded
   */
  useEffect(() => {
    setIsAuthenticated(false)
    const storage = new Storage('localStorage')
    const token = storage.get<string>(StorageKey.TOKEN)
    if (!token) {
      if (shouldAuthenticated) router.replace('/login')
      return
    }
    httpClient
      .get<IMeResponseDTO>('/auth/me')
      .then(({ data }) => {
        setUser(data)
        setIsAuthenticated(true)
      })
      .catch((err) => {
        storage.remove(StorageKey.TOKEN)
        if (shouldAuthenticated) router.replace('/login')
      })
  }, [setUser, shouldAuthenticated, router])

  const MainContent = () => {
    if (!((shouldAuthenticated && isAuthenticated) || !shouldAuthenticated)) return null
    return (
      <>
        {Component.topBarProps && <TopBar {...Component.topBarProps} />}
        <Component {...pageProps} />
      </>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Welcome to doji-frontend!</title>
        </Head>
        <StyledContainer maxWidth="sm">
          <MainContent />
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
