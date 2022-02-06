import ProfileTextfield from '@frontend/components/Card/ProfileTextfield'
import ProfileTextfieldDisabled from '@frontend/components/Card/ProfileTextfieldDisabled'
import NewprofileTextfield from '@frontend/components/Card/newProfileTextfield'
import { Avatar, Button, Container } from '@mui/material'

/* eslint-disable */
export function Index() {
  return (
    <Container maxWidth="sm" className="profileLayout">
      <Avatar alt="Ree" src="/static/images/avatar/1.jpg" sx={{ width: 48, height: 48 }} />
      <Button variant="contained">Edit Profile</Button>
      <NewprofileTextfield />
      <div className="profileTextForm">
        <ProfileTextfieldDisabled Adornment="Username" defaultValue="@uttanon246" />
        <ProfileTextfield Adornment="Display" defaultValue="Uttanon246" />
        <ProfileTextfield Adornment="First name" defaultValue="Uttanon" />
        <ProfileTextfield Adornment="Last name" defaultValue="Ausungnoen" />
        <ProfileTextfield Adornment="Location" defaultValue="Thailand" />
        <h1 className="profileFormHeader">ACCOUNT INFORMATION</h1>
        <div className="profileTextForm">
          <ProfileTextfield Adornment="Email" defaultValue="uttanon.aug@gmail.com" />
        </div>
      </div>
    </Container>
  )
}

export default Index
