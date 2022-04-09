import { Button, CircularProgress, Link, Stack, Typography } from '@mui/material'
import { useQuery } from 'react-query'

import { getServerSideUser } from '@frontend/common/auth'
import { httpClient } from '@frontend/services'

import { IMeResponseDTO, IWorkHistory } from '@libs/api'
import { Achievement } from '@libs/mui'

interface SettingsPageProps {
  user: IMeResponseDTO
}

const Index: React.FC<SettingsPageProps> = ({ user }) => {
  const { data, isLoading } = useQuery<IWorkHistory>(['workHistory', user.username], async () => {
    const { data } = await httpClient.get('expert/work/histories')
    return data
  })

  if (isLoading) return <CircularProgress />

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="title3" mt={4}>
        My Experiences
      </Typography>

      {(data as any).map((data, index) => {
        return <Achievement editable title={data.topic} desc={data.description} key={index} />
      })}

      <Link href="./experience/add-work-history">
        <Button variant="outlined" fullWidth style={{ marginTop: '24px' }}>
          Add experience
        </Button>
      </Link>
    </Stack>
  )
}

export default Index

export const getServerSideProps = getServerSideUser()
