import ProfileTextfield from '@frontend/components/Card/ProfileTextfield'
import ProfileTextfieldDisabled from '@frontend/components/Card/ProfileTextfieldDisabled'
import { Avatar, Button, Container } from '@mui/material'

/* eslint-disable */
export function Index() {
  return (
    <Container maxWidth="sm">
      <Avatar alt="Ree" src="/static/images/avatar/1.jpg" sx={{ width: 48, height: 48 }} />
      <Button variant="contained">Edit Profile</Button>
      <div className="profileTextForm">
        <ProfileTextfieldDisabled Adornment="Username" defaultValue="@uttanon246" />
        <ProfileTextfield Adornment="Display" defaultValue="Uttanon246" />
        <ProfileTextfield Adornment="First name" defaultValue="Uttanon" />
        <ProfileTextfield Adornment="Last name" defaultValue="Ausungnoen" />
        <ProfileTextfield Adornment="Location" defaultValue="Thailand" />
      </div>
      <h1>ACCOUNT INFORMATION</h1>
      <div className="profileTextForm">
        <ProfileTextfield Adornment="Email" defaultValue="uttanon.aug@gmail.com" />
      </div>
    </Container>
  )
}

export default Index
