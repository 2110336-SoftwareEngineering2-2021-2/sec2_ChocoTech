import { httpClient } from '@frontend/services'
import { IApproveExpertDetailDTO } from '@libs/api'
import { Achievement, CompactProfile } from '@libs/mui'
import { Button, Stack, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'

import { useQuery } from 'react-query'

export function Index({ username }) {
  const HandleDecline = () => {
    return null
  }
  const HandleAccept = () => {
    return null
  }
  const { data, isLoading } = useQuery<IApproveExpertDetailDTO>(
    ['getWorkHistory', username],
    async () => {
      const { data } = await httpClient.get(`/admin/workHistory/${username}`)
      return data
    },
  )

  if (isLoading) {
    return null
  }

  return (
    <Stack>
      <CompactProfile
        username={username}
        displayName={data.firstname + ' ' + data.lastname}
        profileUrl=""
        isExpert
      />
      <Typography variant="regular" color="sky.main" pl={3}>
        Working history and Acheivement
      </Typography>
      {data.workHistory.map((data, key) => {
        return <Achievement title={data.topic} desc={data.description} key={key} />
      })}
      <Stack m={3} direction="row" justifyContent="space-between" spacing={3.5}>
        <Button fullWidth onClick={HandleDecline} variant="outlined" size="large">
          Decline
        </Button>
        <Button fullWidth onClick={HandleAccept} size="large">
          Accept
        </Button>
      </Stack>
    </Stack>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query
  return {
    props: {
      username: query.username,
    },
  }
}

export default Index
