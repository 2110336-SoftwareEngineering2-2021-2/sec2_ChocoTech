import { httpClient } from '@frontend/services'
import { IApproveExpertDetailDTO } from '@libs/api'
import { Achievement, CompactProfile } from '@libs/mui'
import { Button, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'

import { useMutation, useQuery } from 'react-query'

function Index() {
  const router = useRouter()
  const username = router.query.username as string

  const changeRole = async () => {
    return await httpClient.put<void>(`admin/role/${username}`)
  }
  const changeRoleMutation = useMutation<void, AxiosError, ICha>(changeRole, {
    onSuccess: () => {
      toast.success('Password changed successfully')
    },
    onError: (error: AxiosError) => {
      toast.error(error.response.data.message)
    },
  })

  const handleDecline = () => {
    return null
  }

  const handleAccept = () => {
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
    <Stack mt={5}>
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
        <Button fullWidth onClick={handleDecline} variant="outlined" size="large">
          Decline
        </Button>
        <Button fullWidth onClick={handleAccept} size="large">
          Accept
        </Button>
      </Stack>
    </Stack>
  )
}

export default Index
