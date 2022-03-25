import WorkHistoryCard, { WorkHistoryCardProps } from '@frontend/components/Card/WorkHistoryCard'
import { ExtendedNextPage } from '@frontend/type'
import { Avatar, Button, Divider, Stack, Typography, styled } from '@mui/material'

const mockDatas: WorkHistoryCardProps[] = [
  {
    topic: 'Who to be a millionaire',
    description: 'Its me, Its me!',
  },
  {
    topic: 'Who to be a millionaire',
    description:
      'Suspendisse potenti. Quisque mattis velit vitae augue finibus congue. Maecenas tincidunt erat consectetur magna eleifend mattis. Phasellus vitae vestibulum arcu. Cras tristique in ante eu consequat. Nulla pretium dolor velit, a interdum ex dapibus et. Quisque viverra lacus metus, eget feugiat ex cursus vel. Nam at luctus sem.',
  },
  {
    topic: 'Who to be a millionaire',
    description:
      'Suspendisse potenti. Quisque mattis velit vitae augue finibus congue. Maecenas tincidunt erat consectetur magna eleifend mattis. Phasellus vitae vestibulum arcu. Cras tristique in ante eu consequat. Nulla pretium dolor velit, a interdum ex dapibus et. Quisque viverra lacus metus, eget feugiat ex cursus vel. Nam at luctus sem.',
  },
]
const StyleAvatar = styled(Avatar)`
  width: ${({ theme }) => theme.spacing(16)};
  height: ${({ theme }) => theme.spacing(16)};
`
const Index: ExtendedNextPage = () => {
  return (
    <>
      <Stack direction={'column'} justifyContent="space-between" spacing={4}>
        <Stack direction={'row'} justifyContent="space-between" bgcolor="sky.lighter" p={4}>
          <StyleAvatar src="/static/images/avatar/1.jpg" />
          <Stack direction={'column'} alignItems={'end'}>
            <Typography variant="title3" fontWeight={700}>
              Thanin Sawetkititham
            </Typography>
            <Typography variant="regular" fontWeight={400} color="ink.lighter">
              @stangthanin
            </Typography>
            <br></br>
            <Typography variant="regular" fontWeight={400} color="primary">
              location: Thailand
            </Typography>
          </Stack>
        </Stack>
        <Stack divider={<Divider flexItem />} spacing={2}>
          {mockDatas.map((data, index) => (
            <WorkHistoryCard {...data} key={index} index={index + 1} />
          ))}
        </Stack>
        <Button color="primary" size="medium" variant="outlined">
          Add more work history
        </Button>
      </Stack>
    </>
  )
}
export default Index
