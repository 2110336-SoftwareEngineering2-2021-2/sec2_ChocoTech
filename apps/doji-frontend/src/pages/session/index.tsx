import { httpClient } from '@frontend/services'
import { ExtendedNextPage } from '@frontend/type'
import { ISchedule } from '@libs/api'
import { SearchBar, SessionCard, SessionCardProps } from '@libs/mui'
import { Divider, Stack } from '@mui/material'

import { useQuery } from 'react-query'

// const mockDatas: SessionCardProps[] = [
//   {
//     topic: 'hello',
//     expertName: 'Poravee',
//     price: 250,
//     profileImageURL: 'https://mui.com/static/images/avatar/1.jpg',
//     sessionDetail: 'OS Session',
//   },
//   {
//     topic: 'Poravee2',
//     expertName: 'Poravee',
//     price: 875,
//     profileImageURL: 'https://mui.com/static/images/avatar/1.jpg',
//     sessionDetail: 'SE MOCKUP DATA',
//   },
// ]

const Index: ExtendedNextPage = () => {
  const { data, isLoading } = useQuery<ISchedule[]>('/session', () =>
    httpClient.get('/session').then((res) => res.data),
  )
  return (
    <>
      <SearchBar />
      <Stack divider={<Divider flexItem />} spacing={2}>
        {data.map((elem, index) => (
          <SessionCard {...elem} key={index} />
        ))}
      </Stack>
    </>
  )
}
export default Index
