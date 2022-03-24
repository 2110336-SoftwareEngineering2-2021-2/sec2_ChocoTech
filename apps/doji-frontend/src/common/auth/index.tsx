import { fetchUserInformation } from '@frontend/services/fetcher'
import { IMeResponseDTO } from '@libs/api'
import { GetServerSideProps } from 'next'

interface GetServerSideUserProps {
  user: IMeResponseDTO
}

export const getServerSideUser =
  (fetcher?: () => any): GetServerSideProps<GetServerSideUserProps> =>
  async (context) => {
    console.log(context.req.headers)
    try {
      const data = await fetchUserInformation({
        headers: context.req ? { cookie: context.req.headers.cookie } : undefined,
      })
      const otherProps = fetcher ? await fetcher() : {}
      return {
        props: {
          ...otherProps,
          user: data,
        },
      }
    } catch (err) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
  }
