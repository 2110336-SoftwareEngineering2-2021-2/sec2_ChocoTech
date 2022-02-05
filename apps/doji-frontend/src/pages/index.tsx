import ProfileTextfield from '@frontend/components/Card/ProfileTextfield'
import ProfileTextfieldDisabled from '@frontend/components/Card/ProfileTextfieldDisabled'
import { Avatar, Button } from '@mui/material'

/* eslint-disable */
export function Index() {
  return (
    <div>
      <Avatar alt="Uttanon" src="/static/images/avatar/1.jpg" />
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
    </div>
  )
}

export default Index
