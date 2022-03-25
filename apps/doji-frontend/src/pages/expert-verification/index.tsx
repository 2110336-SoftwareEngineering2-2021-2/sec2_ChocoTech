import { CompactProfile } from '@libs/mui'
import { Dialog, Stack, Typography } from '@mui/material'

import { AiOutlineColumnHeight } from 'react-icons/ai'

export function Index() {
  return (
    <Stack>
      <CompactProfile username="username" displayName="Anonymous" profileUrl="" isExpert />
      <Typography variant="regular" color="sky.main" pl={3}>
        Working history and Acheivement
      </Typography>
    </Stack>
  )
}
export default Index
