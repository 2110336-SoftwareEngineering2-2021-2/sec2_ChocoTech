import { Button, Stack, Typography } from '@mui/material'

export type WorkHistoryCardProps = {
  index?: number
  topic: string
  description?: string
}
const WorkHistoryCard = (props: WorkHistoryCardProps) => {
  return (
    <Stack direction={'row'} spacing={4}>
      <Typography variant="title2" fontWeight={700} color="primary">
        {props.index}
      </Typography>
      <Stack spacing={2} width="100%">
        <Typography variant="large" fontWeight={700}>
          {props.topic}
        </Typography>

        <Typography color="ink.main" variant="small" fontWeight={400}>
          {props.description}
        </Typography>

        <Stack direction={'row'} justifyContent="end">
          <Button color="primary" size="small" variant="text">
            Edit
          </Button>
          <Button color="primary" size="small" variant="text">
            Delete
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
export default WorkHistoryCard
