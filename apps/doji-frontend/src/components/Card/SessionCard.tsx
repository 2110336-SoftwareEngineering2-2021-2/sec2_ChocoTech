import { Avatar, Container, Typography, styled } from '@mui/material'
import { Box } from '@mui/system'

const MainFlex = styled(Box)`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.palette.sky.lighter};
`
const HeaderFlex = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`
const ProfileNameFlex = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`
const PriceFlex = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const TypoPrice = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  font-size: large;
`
const TypoPriceSuffix = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  font-size: medium;
`
const TypoStyleTopic = styled(Typography)`
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  font-size: large;
`
const TypoNamePrefix = styled(Typography)`
  margin-left: ${({ theme }) => theme.spacing(1)};
  margin-right: ${({ theme }) => theme.spacing(0.5)};
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
  color: ${({ theme }) => theme.palette.ink.lighter};
  display: inline;
  font-size: medium;
`
const TypoName = styled(Typography)`
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  color: ${({ theme }) => theme.palette.ink.lighter};
  display: inline;
  font-size: medium;
`
const DetailStyle = styled(Typography)`
  color: ${({ theme }) => theme.palette.ink.main};
  margin-top: ${({ theme }) => theme.spacing(1)};
  display: inline;
  font-size: medium;
`
const StyleAvatar = styled(Avatar)`
  width: ${({ theme }) => theme.spacing(3)};
  height: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(1)};
`
type SessionCardProps = {
  topic: string
  expertName: string
  price: number
  sessionDetail: string
  imgURL: string
}
function SessionCard(props: SessionCardProps) {
  return (
    <MainFlex>
      <HeaderFlex>
        <Box>
          <TypoStyleTopic>{props.topic}</TypoStyleTopic>
          <ProfileNameFlex>
            <StyleAvatar src={props.imgURL} />
            <TypoNamePrefix>by</TypoNamePrefix>
            <TypoName>{props.expertName}</TypoName>
          </ProfileNameFlex>
        </Box>
        <PriceFlex>
          <TypoPrice>{props.price}</TypoPrice>
          <TypoPriceSuffix>/hr/person</TypoPriceSuffix>
        </PriceFlex>
      </HeaderFlex>
      <DetailStyle>{props.sessionDetail}</DetailStyle>
    </MainFlex>
  )
}
export default SessionCard
