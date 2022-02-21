import Storage from '@frontend/common/storage'
import { StorageKey } from '@frontend/common/storage/constants'
import { httpClient, queryClient } from '@frontend/services'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage } from '@frontend/type'
import { MeResponseDTO } from '@libs/api'
import { TopBar, theme } from '@libs/mui'
import { Container, ThemeProvider, styled } from '@mui/material'
import { AppProps } from 'next/app'
import Head from 'next/head'

import { useEffect } from 'react'
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

function CustomApp({ Component, pageProps }: ExtendedAppProps) {
  const { setUser } = useAuthStore()

  /**
   * Initialize user data from local storage,
   * it'll be run only once when the app is loaded
   */
  useEffect(() => {
    const storage = new Storage('localStorage')
    const token = storage.get<string>(StorageKey.TOKEN)
    if (token) {
      httpClient.get<MeResponseDTO>('/auth/me').then(({ data }) => {
        setUser(data)
      })
    } else {
      storage.remove(StorageKey.TOKEN)
    }
  }, [setUser])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Welcome to doji-frontend!</title>
        </Head>
        <StyledContainer maxWidth="sm">
          {Component.topBarProps && <TopBar {...Component.topBarProps} />}
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
