import BottomNav from '@frontend/components/NavigationBar/BottomNav'
import ProfileTextfield from '@frontend/components/TextField/ProfileTextfield'
import { TopBarActionType, TopBarProps } from '@libs/mui'
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
  width: ${({ theme }) => theme.spacing(8)};
  height: ${({ theme }) => theme.spacing(8)};
  margin-top: ${({ theme }) => theme.spacing(3)};
`
// const StyleCircleAdd = styled(AddCircleTwoToneIcon)`
//   width: 16px;
//   height: 16px;
//   margin-left: -16px;
//   margin-top: -16px;
//   z-index: 1;
//   color: ${({ theme }) => theme.palette.primary.light};
//   stroke-width: 1.5px;
// `
export function Index() {
  const [isEditProfile, setEditProfile] = useState(false)
  const [displayName, setDisplayName] = useState('') // should initial with user displayName
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [location, setLocation] = useState('')

  function submitNewProfile() {
    const axios = require('axios')

    axios
      .put('https://dev.choco.saenyakorn.dev/api/profile/edit', {
        displayName,
        email,
        firstName,
        lastName,
        location,
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      <ProfileContainer spacing={4} alignItems="center">
        <Stack display="flex" flexDirection="row" alignItems="flex-end">
          <StyleAvatar alt="Ree" src="/static/images/avatar/1.jpg" />
          {/* <StyleCircleAdd /> */}
        </Stack>
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
              submitNewProfile()
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
            onChange={(e) => {
              setDisplayName(e.target.value)
            }}
          />
          <StyleProfileTextField
            adornment="First name"
            defaultValue="Uttanon"
            placeholder="enter first name"
            readOnly={!isEditProfile}
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
          />
          <StyleProfileTextField
            adornment="Last name"
            defaultValue="Ausungnoen"
            placeholder="enter last name"
            readOnly={!isEditProfile}
            onChange={(e) => {
              setLastName(e.target.value)
            }}
          />
          <StyleProfileTextField
            adornment="Location"
            defaultValue="Thailand"
            placeholder="enter location"
            readOnly={!isEditProfile}
            onChange={(e) => {
              setLocation(e.target.value)
            }}
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
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </ProfileTextForm>
      </ProfileContainer>
      <BottomNav />
    </>
  )
}

export default Index

export const topBarProps: TopBarProps = {
  title: 'My details',
  action: TopBarActionType.Back,
}
