import { ExtendedNextPage } from '@frontend/type'
import { SearchBar, SessionCard, SessionCardProps } from '@libs/mui'
import { Divider, Stack } from '@mui/material'

const mockDatas: SessionCardProps[] = [
  {
    topic: 'hello',
    expertName: 'Poravee',
    price: 250,
    profileImageURL: 'https://mui.com/static/images/avatar/1.jpg',
    sessionDetail: 'OS Session',
  },
  {
    topic: 'Poravee2',
    expertName: 'Poravee',
    price: 875,
    profileImageURL: 'https://mui.com/static/images/avatar/1.jpg',
    sessionDetail: 'SE MOCKUP DATA',
  },
]

const Index: ExtendedNextPage = () => {
  return (
    <>
      <SearchBar />
      <Stack divider={<Divider flexItem />} spacing={2}>
        {mockDatas.map((data, index) => (
          <SessionCard {...data} key={index} />
        ))}
      </Stack>
    </>
  )
}
export default Index
