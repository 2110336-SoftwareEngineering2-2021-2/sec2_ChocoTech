import { Avatar, Box, Stack, Typography } from '@mui/material'

function SessionDetail() {
  //TODO Connect API
  return (
    <div>
      <Stack direction="row" py="0.5em" justifyContent="space-between">
        <Stack spacing="0.5em">
          <Typography variant="large" fontWeight={700}>
            From 1M to 1K, How did I do it?
          </Typography>
          <Stack direction="row" spacing="0.5em">
            <Avatar
              src="https://mui.com/static/images/avatar/1.jpg"
              sx={{ width: 24, height: 24 }}
            />
            <Typography variant="small" fontWeight={400}>
              by{' '}
              <Typography variant="small" fontWeight={500}>
                Poravee Binhayeearason
              </Typography>
            </Typography>
          </Stack>
        </Stack>
        <Stack textAlign="right">
          <Typography variant="large" fontWeight={700} color="primary.dark">
            250
          </Typography>
          <Typography color="primary.dark">/hr/person</Typography>
        </Stack>
      </Stack>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl, aliquet fringilla sed vitae
        amet nisl. Nullam donec molestie duis eu, neque convallis ipsum, congue.
      </Typography>
    </div>
  )
}

export default SessionDetail
