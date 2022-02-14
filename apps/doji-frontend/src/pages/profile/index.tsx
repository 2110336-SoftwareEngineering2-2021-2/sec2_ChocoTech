import BottomNav from '@frontend/components/NavigationBar/BottomNav'
import TopNav from '@frontend/components/NavigationBar/TopNav'
import ProfileTextfield from '@frontend/components/TextField/ProfileTextfield'
import { Avatar, Button, Container, Stack, Typography, styled } from '@mui/material'
import { Box } from '@mui/system'

import { Fragment } from 'react'

const ProfileContainer = styled(Stack)`
  background-color: ${({ theme }) => theme.palette.sky.lightest};
`
const ProfileTextForm = styled(Stack)`
  background-color: ${({ theme }) => theme.palette.white};
  width: 100%;
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.palette.sky.lighter};
`
const ProfileFormHeader = styled(Typography)`
  color: ${({ theme }) => theme.palette.ink.light};
  align-self: flex-start;
  border-top: 1px;
  border-bottom: 1px;
  border-color: ${({ theme }) => theme.palette.sky.dark};
  padding-left: ${({ theme }) => theme.spacing(3)};
`
const StyleProfileTextField = styled(ProfileTextfield)`
  padding: ${({ theme }) => theme.spacing(3)};
  border-top: 1px solid;
  border-color: ${({ theme }) => theme.palette.sky.lighter};
`
const StyleAvatar = styled(Avatar)`
  width: 64px;
  height: 64px;
  margin-top: ${({ theme }) => theme.spacing(3)};
`
export function Index() {
  return (
    <>
      <TopNav icon="back" />
      <ProfileContainer spacing={4} alignItems="center">
        <StyleAvatar alt="Ree" src="/static/images/avatar/1.jpg" />
        <Button variant="contained">Edit Profile</Button>
        <ProfileTextForm>
          <StyleProfileTextField adornment="Username" defaultValue="@uttanon246" disabled />
          <StyleProfileTextField
            adornment="Display"
            defaultValue="Uttanon246"
            placeholder="enter display name"
          />
          <StyleProfileTextField
            adornment="First name"
            defaultValue="Uttanon"
            placeholder="enter first name"
          />
          <StyleProfileTextField
            adornment="Last name"
            defaultValue="Ausungnoen"
            placeholder="enter last name"
          />
          <StyleProfileTextField
            adornment="Location"
            defaultValue="Thailand"
            placeholder="enter location"
          />
        </ProfileTextForm>
        <ProfileFormHeader variant="tiny" fontWeight={400}>
          ACCOUNT INFORMATION
        </ProfileFormHeader>
        <ProfileTextForm>
          <StyleProfileTextField adornment="Email" defaultValue="uttanon.aug@gmail.com" />
        </ProfileTextForm>
      </ProfileContainer>
      <BottomNav />
    </>
  )
}

export default Index
