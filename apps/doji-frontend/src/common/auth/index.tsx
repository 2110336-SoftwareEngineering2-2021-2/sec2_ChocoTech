import { fetchUserInformation } from '@frontend/services/fetcher'
import { IMeResponseDTO } from '@libs/api'
import { GetServerSideProps } from 'next'

interface GetServerSideUserProps {
  user: IMeResponseDTO
}

export const getServerSideUser: GetServerSideProps<GetServerSideUserProps> = async (context) => {
  try {
    const data = await fetchUserInformation()
    return {
      props: {
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
