import { SearchBar, TopBar } from '@libs/mui'
import { Box } from '@mui/material'

export function Index() {
  return (
    <Box>
      <TopBar title="New session" action="back"></TopBar>
      <SearchBar margin="none"></SearchBar>
      <Box marginTop={3}></Box>
    </Box>
  )
}
export default Index
