import { httpClient } from '@frontend/services'
import { IApproveExpertDetailDTO } from '@libs/api'
import { Achievement, CompactProfile } from '@libs/mui'
import { Button, Stack, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'

import { useQuery } from 'react-query'

export function Index({ username }) {
  const { data, isLoading } = useQuery<IApproveExpertDetailDTO>(
    ['getWorkHistory', username],
    async () => {
      const { data } = await httpClient.get(`/admin/workHistory/${username}`)

      console.log(data)
      return data
    },
  )

  if (isLoading) {
    return null
  }

  return (
    <Stack>
      <CompactProfile username={username} displayName="Anonymous" profileUrl="" isExpert />
      <Typography variant="regular" color="sky.main" pl={3}>
        Working history and Acheivement
      </Typography>
      {data.workHistory.map((data, key) => {
        return (
          <Achievement title={data.topic} desc={data.description} src={data.imageUrl} key={key} />
        )
      })}
      <Stack>
        <Button variant="">Decline</Button>
        <Button>Accept</Button>
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
