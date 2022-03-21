import { getServerSideUser } from '@frontend/common/auth'
import { SearchBar } from '@libs/mui'
import { Stack } from '@mui/material'
import router from 'next/router'

import { BiPlus } from 'react-icons/bi'

function AdminPage() {
  const handleClickOpen = () => {
    router.push('/admin/new')
  }
  return (
    <Stack>
      <SearchBar />
    </Stack>
  )
}

export default AdminPage

export const getServerSideProps = getServerSideUser
