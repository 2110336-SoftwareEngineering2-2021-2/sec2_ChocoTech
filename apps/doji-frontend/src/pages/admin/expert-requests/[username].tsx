import { httpClient } from '@frontend/services'
import { IApproveExpertDetailDTO, IChangeUserRoleDTO } from '@libs/api'
import { Achievement, CompactProfile } from '@libs/mui'
import { Button, Stack, Typography } from '@mui/material'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'

import toast from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'

function Index() {
  const router = useRouter()
  const username = router.query.username as string
  const changeRoleMutation = useMutation<void, AxiosError, IChangeUserRoleDTO>(async (data) => {
    return await httpClient.put(`admin/role/${username}`, data)
  })

  const handleDecline = async () => {
    try {
      await toast.promise(changeRoleMutation.mutateAsync({ status: 'rejected' }), {
        loading: 'rejecting user...',
        success: 'Successfully reject',
        error: 'Failed to reject user',
      })
      router.push('/admin/expert-requests')
    } catch (err) {
      console.log(err)
    }
  }

  const handleAccept = async () => {
    try {
      await toast.promise(changeRoleMutation.mutateAsync({ status: 'approved' }), {
        loading: 'approving user...',
        success: 'Successfully approve',
        error: 'Failed to approve user',
      })
      router.push('/admin/expert-requests')
    } catch (err) {
      console.log(err)
    }
  }

  const { data, isLoading, isIdle } = useQuery<IApproveExpertDetailDTO>(
    ['getWorkHistory', username],
    async () => {
      const { data } = await httpClient.get(`/admin/workHistory/${username}`)
      return data
    },
    { enabled: !!username },
  )

  if (isLoading || isIdle) {
    return null
  }

  return (
    <Stack mt={5}>
      <CompactProfile username={username} displayName={data.displayName} profileUrl="" isExpert />
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
