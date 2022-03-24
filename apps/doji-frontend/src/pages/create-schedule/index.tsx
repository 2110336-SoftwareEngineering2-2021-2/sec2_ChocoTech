import { SearchBar } from '@libs/mui'
import { Box } from '@mui/material'

import SessionCard from '../../components/ExpertService/SessionCard'

export function Index() {
  return (
    <div>
      <SearchBar margin="none"></SearchBar>
      <Box marginTop={3}>
        <SessionCard
          title="How to read indicator"
          price={250}
          expertName="Rick Astley"
          description="Are you sure you want to create this session? You will be deducted 500 Doji coins"
          expertUsername="newUser"
          serviceName="How to read indicator"
        ></SessionCard>
      </Box>
    </div>
  )
}
export default Index
