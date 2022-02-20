import TopNav from '@frontend/components/NavigationBar/TopNav'
import { Container, Stack, Typography } from '@mui/material'

export function TermsOfService() {
  return (
    <Container maxWidth="sm">
      <TopNav icon="close" title="Terms of Service" href="./" />
      <Stack direction="column" justifyContent="space-between" mt={2} spacing={2}>
        <Typography variant="regular" fontWeight={400}>
          Terms of Service
        </Typography>
        <Typography variant="body1" fontWeight={400}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pretium efficitur ex quis
          accumsan. Etiam id nibh at magna convallis faucibus eu eu ex. Sed auctor, sapien sit amet
          varius imperdiet, nulla ante tincidunt justo, ut eleifend nulla felis sit amet lorem.
          Vestibulum gravida lacinia felis non maximus. Suspendisse augue mauris, tincidunt luctus
          posuere vel, lobortis eget felis. Maecenas ut nunc eu erat consectetur congue. Ut at lorem
          mi. Vestibulum sit amet metus sit amet ex cursus volutpat in nec lorem. Nunc ut viverra
          orci. Vivamus mollis mattis mauris, eu condimentum velit interdum sed.
        </Typography>
      </Stack>
    </Container>
  )
}

export default TermsOfService
