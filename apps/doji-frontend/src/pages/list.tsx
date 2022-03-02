import { ExtendedNextPage } from '@frontend/type'
import { Button, Link as MuiLink, Stack, Typography } from '@mui/material'
import Link from 'next/link'

const ListPage: ExtendedNextPage = () => {
  return (
    <Stack direction="column" gap={4} flexGrow={1} component="ul">
      <Link href="/" passHref>
        <MuiLink component="li">Main Page</MuiLink>
      </Link>
      <Link href="/register" passHref>
        <MuiLink component="li">Register Page</MuiLink>
      </Link>
      <Link href="/register/expert" passHref>
        <MuiLink component="li">Expert Register Page</MuiLink>
      </Link>
      <Link href="/login" passHref>
        <MuiLink component="li">Login Page</MuiLink>
      </Link>
      <Link href="/change-password" passHref>
        <MuiLink component="li">Change Password Page</MuiLink>
      </Link>
      <Link href="/profile" passHref>
        <MuiLink component="li">Profile Page</MuiLink>
      </Link>
      <Link href="/payment" passHref>
        <MuiLink component="li">Payment Page</MuiLink>
      </Link>
      <Link href="/session" passHref>
        <MuiLink component="li">Session Page</MuiLink>
      </Link>
      <Link href="/my-session" passHref>
        <MuiLink component="li">My Session Page</MuiLink>
      </Link>
      <Link href="/balance" passHref>
        <MuiLink component="li">Balance Page</MuiLink>
      </Link>
      {/* <Link href="/view-requests/expert-detail" passHref>
        <MuiLink component="li">View Request Page</MuiLink>
      </Link> */}
    </Stack>
  )
}

export default ListPage

ListPage.topBarProps = {
  title: 'List of all pages',
}
