import SessionCard, { SessionCardProps } from '@frontend/components/Card/SessionCard'
import { ExtendedNextPage } from '@frontend/type'
import { SearchBar } from '@libs/mui'
import { Container, Divider, Stack, styled } from '@mui/material'
import { TopBarActionType } from 'libs/mui/src/lib/TopBar'

const mockDatas: SessionCardProps[] = [
  {
    topic: 'hello',
    expertName: 'Poravee',
    price: 250,
    profileImageURL: '/static/images/avatar/1.jpg',
    sessionDetail: 'OS Session',
  },
  {
    topic: 'Poravee2',
    expertName: 'Poravee',
    price: 875,
    profileImageURL: '/static/images/avatar/1.jpg',
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

//Index.shouldAuthenticated = true
Index.topBarProps = {
  title: 'Search session',
  action: TopBarActionType.Back,
}
