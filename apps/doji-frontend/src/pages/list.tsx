import { Link as MuiLink, Stack } from '@mui/material'
import Link from 'next/link'
import { FormEventHandler, useRef } from 'react'

import { ExtendedNextPage } from '@frontend/type'

import { SearchBar, SearchBarRef } from '@libs/mui'

const ListPage: ExtendedNextPage = () => {
  const ref = useRef<SearchBarRef>(null)

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log(ref.current.get<string | undefined>('value'))
  }

  return (
    <Stack direction="column" gap={4} flexGrow={1} component="ul">
      <Link href="/" passHref>
        <MuiLink component="li">Main Page</MuiLink>
      </Link>
      <Link href="/signup" passHref>
        <MuiLink component="li">Register Page</MuiLink>
      </Link>
      <Link href="/signup/expert" passHref>
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
      <Link href="/work-history" passHref>
        <MuiLink component="li">Work History Page</MuiLink>
      </Link>
      {/* <Link href="/view-requests/expert-detail" passHref>
        <MuiLink component="li">View Request Page</MuiLink>
      </Link> */}
      <SearchBar
        onChange={(e) => {
          console.log(e.target.value)
        }}
      />
      <form onSubmit={onSubmit}>
        <SearchBar ref={ref} />
      </form>
    </Stack>
  )
}

export default ListPage
