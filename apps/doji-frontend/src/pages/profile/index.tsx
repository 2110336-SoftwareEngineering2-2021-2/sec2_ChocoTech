import BottomNav from '@frontend/components/NavigationBar/BottomNav'
import TopNav from '@frontend/components/NavigationBar/TopNav'
import ProfileTextfield from '@frontend/components/TextField/ProfileTextfield'
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone'
import { Avatar, Button, Stack, Typography, styled } from '@mui/material'

import { useState } from 'react'

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
const StyleCircleAdd = styled(AddCircleTwoToneIcon)`
  width: 16px;
  height: 16px;
  margin-left: -16px;
  margin-top: -16px;
  z-index: 1;
  color: ${({ theme }) => theme.palette.primary.light};
  stroke-width: 1.5px;
`
const StyleTest = styled(Stack)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`
export function Index() {
  const [isEditProfile, setEditProfile] = useState(false)
  return (
    <>
      <TopNav icon="back" />
      <ProfileContainer spacing={4} alignItems="center">
        <StyleTest>
          <StyleAvatar alt="Ree" src="/static/images/avatar/1.jpg" />
          <StyleCircleAdd />
        </StyleTest>
        {!isEditProfile && (
          <Button
            variant="contained"
            onClick={() => {
              setEditProfile(true)
            }}
          >
            Edit Profile
          </Button>
        )}
        {isEditProfile && (
          <Button
            variant="contained"
            onClick={() => {
              setEditProfile(false)
            }}
          >
            Save
          </Button>
        )}
        <ProfileTextForm>
          <StyleProfileTextField
            adornment="Username"
            defaultValue="@uttanon246"
            disabled
            readOnly={!isEditProfile}
          />
          <StyleProfileTextField
            adornment="Display"
            defaultValue="Uttanon246"
            placeholder="enter display name"
            readOnly={!isEditProfile}
          />
          <StyleProfileTextField
            adornment="First name"
            defaultValue="Uttanon"
            placeholder="enter first name"
            readOnly={!isEditProfile}
          />
          <StyleProfileTextField
            adornment="Last name"
            defaultValue="Ausungnoen"
            placeholder="enter last name"
            readOnly={!isEditProfile}
          />
          <StyleProfileTextField
            adornment="Location"
            defaultValue="Thailand"
            placeholder="enter location"
            readOnly={!isEditProfile}
          />
        </ProfileTextForm>
        <ProfileFormHeader variant="tiny" fontWeight={400}>
          ACCOUNT INFORMATION
        </ProfileFormHeader>
        <ProfileTextForm>
          <StyleProfileTextField
            adornment="Email"
            defaultValue="uttanon.aug@gmail.com"
            readOnly={!isEditProfile}
          />
        </ProfileTextForm>
      </ProfileContainer>
      <BottomNav />
    </>
  )
}

export default Index
