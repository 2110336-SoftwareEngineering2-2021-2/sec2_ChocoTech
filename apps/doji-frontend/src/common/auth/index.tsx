import { fetchUserInformation } from '@frontend/services/fetcher'
import { IMeResponseDTO } from '@libs/api'
import axios from 'axios'
import { GetServerSideProps } from 'next'

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
