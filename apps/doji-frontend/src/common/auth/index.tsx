import axios from 'axios'
import { GetServerSideProps } from 'next'

import { queryClient } from '@frontend/services'
import { fetchUserInformation } from '@frontend/services/fetcher'

import { IMeResponseDTO } from '@libs/api'

interface GetServerSideUserProps {
  user: IMeResponseDTO
}

export const getServerSideUser =
  (fetcher?: () => any): GetServerSideProps<GetServerSideUserProps> =>
  async (context) => {
    try {
      const cookieHeader = context?.req?.headers?.cookie
      const data = await fetchUserInformation({
        headers: cookieHeader ? { cookie: cookieHeader } : undefined,
      })
      queryClient.setQueryData('user', data)
      const otherProps = fetcher ? await fetcher() : {}
      return {
        props: {
          ...otherProps,
          user: data,
        },
      }
    } catch (err) {
      if (!axios.isAxiosError(err)) throw err
      if (err.response?.status != 401) throw err
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
  }
