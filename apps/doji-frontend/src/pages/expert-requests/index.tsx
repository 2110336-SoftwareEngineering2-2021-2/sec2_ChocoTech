import { SearchBar, Tables, TablesActionType } from '@libs/mui'
import { Stack, Typography } from '@mui/material'

const tempMockData = [
  {
    firstname: 'Yeltsa',
    lastname: 'Kcir',
    username: 'newUser',
  },
  {
    firstname: 'Rick',
    lastname: 'Astley',
    username: 'rick',
  },
  {
    firstname: 'Incredible',
    lastname: 'Uncanny',
    username: 'incredible',
  },
  {
    firstname: 'Gawr',
    lastname: 'Gura',
    username: 'gura',
  },
  {
    firstname: 'Usada',
    lastname: 'Pekora',
    username: 'usada',
  },
  {
    firstname: 'Oozora',
    lastname: 'Subaru',
    username: 'oozora',
  },
]
interface IExpertCardProp {
  fullname: string
  username: string
}
function ExpertCard(props: IExpertCardProp) {
  return (
    <Tables
      action={{
        children: 'detail',
        type: TablesActionType.Button,
      }}
      avatar={{
        alt: 'Robert William',
        children: 'TY',
        src: 'https://mui.com/static/images/avatar/1.jpg',
        sx: {
          bgcolor: 'primary.main',
        },
      }}
      content={props.fullname}
    />
  )
}
function ExpertRequest() {
  return (
    <Stack>
      <br />
      <Typography fontWeight={700} variant="h4">
        Expert Requests
      </Typography>
      <br />
      <SearchBar />
      <br />
      <Stack>
        {tempMockData.map((value) => {
          return (
            <ExpertCard
              key={value.username}
              fullname={`${value.firstname} ${value.lastname}`}
              username={value.username}
            />
          )
        })}
      </Stack>
    </Stack>
  )
}

export default ExpertRequest
