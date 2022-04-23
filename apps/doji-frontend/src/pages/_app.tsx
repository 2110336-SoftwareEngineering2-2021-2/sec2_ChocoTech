import { Container, ThemeProvider, styled } from '@mui/material'
import { OnlineStatusHookContext } from 'libs/mui/src/lib/StatusBadge'
import { isEqual } from 'lodash'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClientProvider, useQuery, useQueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { queryClient } from '@frontend/services'
import { fetchUserInformation } from '@frontend/services/fetcher'
import { useOnlineStatus } from '@frontend/services/online-status'
import { useAuthStore } from '@frontend/stores'
import { ExtendedNextPage } from '@frontend/type'

import { IMeResponseDTO } from '@libs/api'
import { NavBar, NavBarProps, theme } from '@libs/mui'

import './style.css'

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

type ExtendedAppProps = AppProps & {
  Component: ExtendedNextPage
}

const MagicComponent: React.FC<{ user?: IMeResponseDTO }> = ({ user }) => {
  const oldUser = useAuthStore((state) => state.user)
  const setUser = useAuthStore((store) => store.setUser)
  const [allowedToFetch, setAllowedToFetch] = useState(true)

  /**
   * First rendering set the current user
   */
  useQuery('user', fetchUserInformation, {
    onSuccess: (data) => {
      setUser(data)
      setAllowedToFetch(false)
    },
    onError: () => {
      setAllowedToFetch(false)
    },
    enabled: allowedToFetch,
    retry: false,
  })

  /**
   * Retrieve user from SSR
   */
  useEffect(() => {
    if (user && isEqual(oldUser, user)) {
      setUser(user)
    }
  }, [user, setUser, oldUser])

  return null
}

interface MainNavBarProps extends NavBarProps {
  show?: boolean
}

const MainNavBar: React.FC<MainNavBarProps> = ({ show, ...props }) => {
  const user = useAuthStore((store) => store.user)
  if (!show) return null
  return (
    <NavBar
      role={user?.role ? user.role : 'none'}
      username={user?.username ?? 'username'}
      avartarSrc={user?.profilePictureURL}
      {...props}
    />
  )
}

function CustomApp(props: ExtendedAppProps) {
  const { Component, pageProps } = props
  const showNavbar = !Component.dontShowNavBar

  return (
    <QueryClientProvider client={queryClient}>
      <OnlineStatusHookContext.Provider value={useOnlineStatus}>
        <ThemeProvider theme={theme}>
          <Head>
            <title>Welcome to doji-frontend!</title>
          </Head>
          <MainNavBar show={showNavbar} {...Component.navBarProps} />
          <StyledContainer maxWidth="sm" {...Component.containerProps}>
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
      </OnlineStatusHookContext.Provider>
      <MagicComponent user={pageProps.user} />
      <Script src="https://cdn.omise.co/omise.js" />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default CustomApp
