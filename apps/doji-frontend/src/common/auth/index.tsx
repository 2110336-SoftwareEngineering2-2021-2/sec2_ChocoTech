import { fetchUserInformation } from '@frontend/services/fetcher'
import { IMeResponseDTO } from '@libs/api'
import { GetServerSideProps } from 'next'

interface GetServerSideUserProps {
  user: IMeResponseDTO
}

function isPromise(promise) {
  return !!promise && typeof promise.then === 'function'
}

export const getServerSideUser =
  (fetcher?: (() => any) | (() => Promise<any>)): GetServerSideProps<GetServerSideUserProps> =>
  async (context) => {
    try {
      const data = await fetchUserInformation()
      let otherProps = {}
      if (fetcher) {
        otherProps = isPromise(fetcher) ? await fetcher() : fetcher()
      }
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
