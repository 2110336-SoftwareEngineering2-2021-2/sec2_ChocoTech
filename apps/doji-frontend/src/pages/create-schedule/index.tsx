import { SearchBar, TopBar } from '@libs/mui'
import { Box } from '@mui/material'

import SessionCard from './SessionCard'

export function Index() {
  return (
    <Box>
      <TopBar title="New session" action="back"></TopBar>
      <SearchBar margin="none"></SearchBar>
      <Box marginTop={3}>
        <SessionCard
          title="How to read indicator"
          price={250}
          expertName="Rick Astley"
          description="asdjflskd aslkdfl;  k;laskd ksljdklf  masm,ndfl kskl jlkjlks kasjdljfkldj lkasjdflksn m,id asd ,m ns,m kjsdlfkja m,.ma sdkfj lk"
        ></SessionCard>
      </Box>
    </Box>
  )
}
export default Index
