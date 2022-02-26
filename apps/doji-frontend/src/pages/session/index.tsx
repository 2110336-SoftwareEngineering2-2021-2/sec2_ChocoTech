import SessionCard from '@frontend/components/Card/SessionCard'
import { ExtendedNextPage } from '@frontend/type'
import { SearchBar } from '@libs/mui'
import { Container, styled } from '@mui/material'
import { TopBarActionType } from 'libs/mui/src/lib/TopBar'

const Index: ExtendedNextPage = () => {
  return (
    <Container>
      <SearchBar />
      <SessionCard
        topic="hello"
        expertName="Poravee"
        price={69}
        imgURL="/static/images/avatar/1.jpg"
        sessionDetail="Weeheeheehee dee heeheeheehee weeoh aweem away
Weeheeheehee dee heeheeheehee weeoh aweem away"
      />
      <SessionCard
        topic="Poravee Zalnw007"
        expertName="Poravee"
        price={5555555555555}
        imgURL="/static/images/avatar/1.jpg"
        sessionDetail="
        พวกกูไม่แก๊งหรอก ไอ้ Sus พวกกูแค่ชอบ C Walk"
      />
    </Container>
  )
}
export default Index

//Index.shouldAuthenticated = true
Index.topBarProps = {
  title: 'Search session',
  action: TopBarActionType.Back,
}
