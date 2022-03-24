import { getServerSideUser } from '@frontend/common/auth'
import { SearchBar } from '@libs/mui'
import { Stack } from '@mui/material'
import router from 'next/router'

function AdminPage() {
  return (
    <Stack>
      <SearchBar />
    </Stack>
  )
}

export default AdminPage

export const getServerSideProps = getServerSideUser()
