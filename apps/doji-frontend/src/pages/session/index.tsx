import SessionCard, { SessionCardProps } from '@frontend/components/Card/SessionCard'
import { ExtendedNextPage } from '@frontend/type'
import { SearchBar } from '@libs/mui'
import { Container, Divider, Stack, styled } from '@mui/material'
import { TopBarActionType } from 'libs/mui/src/lib/TopBar'

const mockDatas: SessionCardProps[] = [
  {
    topic: 'hello',
    expertName: 'Poravee',
    price: 69,
    imgURL: '/static/images/avatar/1.jpg',
    sessionDetail:
      'Weeheeheehee dee heeheeheehee weeoh aweem away Weeheeheehee dee heeheeheehee weeoh aweem away',
  },
  {
    topic: 'Poravee Zalnw007',
    expertName: 'Poravee',
    price: 5555555555555,
    imgURL: '/static/images/avatar/1.jpg',
    sessionDetail: 'พวกกูไม่แก๊งหรอก ไอ้ Sus พวกกูแค่ชอบ C Walk',
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
