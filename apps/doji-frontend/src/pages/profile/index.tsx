import BottomNav from '@frontend/components/Card/BottomNav'
import ProfileTextfield from '@frontend/components/Card/ProfileTextfield'
import ProfileTextfieldDisabled from '@frontend/components/Card/ProfileTextfieldDisabled'
import TopNav from '@frontend/components/Card/TopNav'
import { Avatar, Button, Container, Stack, Typography, styled } from '@mui/material'

/* eslint-disable */

const ProfileContainer = styled(Stack)`
  background-color: ${({ theme }) => theme.palette.sky.lightest};
`
const ProfileTextForm = styled(Container)`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.white};
  width: 100%;
  padding: 0;
`
const ProfileFormHeader = styled(Typography)`
  color: #6c7072;
`
export function Index() {
  return (
    <Container maxWidth="sm">
      <TopNav icon="back" />
      <ProfileContainer gap={4} justifyContent="center">
        <Avatar alt="Ree" src="/static/images/avatar/1.jpg" sx={{ width: 48, height: 48 }} />
        <Button variant="contained">Edit Profile</Button>
        <ProfileTextForm>
          <ProfileTextfieldDisabled Adornment="Username" defaultValue="@uttanon246" />
          <ProfileTextfield Adornment="Display" defaultValue="Uttanon246" />
          <ProfileTextfield Adornment="First name" defaultValue="Uttanon" />
          <ProfileTextfield Adornment="Last name" defaultValue="Ausungnoen" />
          <ProfileTextfield Adornment="Location" defaultValue="Thailand" />
        </ProfileTextForm>
        <ProfileFormHeader>ACCOUNT INFORMATION</ProfileFormHeader>
        <ProfileTextForm>
          <ProfileTextfield Adornment="Email" defaultValue="uttanon.aug@gmail.com" />
        </ProfileTextForm>
      </ProfileContainer>
      <BottomNav />
    </Container>
  )
}

export default Index
