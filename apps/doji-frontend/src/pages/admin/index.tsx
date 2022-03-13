import { SearchBar, TopBar, TopBarModeType } from '@libs/mui'
import { Stack } from '@mui/material'
import router from 'next/router'

import { BiPlus } from 'react-icons/bi'

function AdminPage() {
  const handleClickOpen = () => {
    router.push('/admin/new')
  }
  return (
    <Stack>
      <TopBar
        button={{
          endIcon: <BiPlus />,
          label: 'New',
          onClick: handleClickOpen,
        }}
        mode={TopBarModeType.Heading}
        title="Admin"
      />
      <SearchBar />
    </Stack>
  )
}

export default AdminPage
AdminPage.shouldAuthenticated = true