import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

import { Tables } from '@libs/mui'

export interface SessionProb {
  title?: string
  price?: number
  expertName?: string
  description?: string
  expertUsername?: string
  serviceName?: string
}

export const SessionCard: React.FC<SessionProb> = ({
  title,
  price,
  expertName,
  description,
  expertUsername,
  serviceName,
}) => {
  return (
    <Card variant="outlined">
      <Link
        href={{
          pathname: 'schedule-session',
          query: { expert_username: expertUsername, service_name: serviceName },
        }}
        passHref
      >
        <CardContent sx={{ cursor: 'pointer' }}>
          <Grid container display="inline-flex">
            <Grid item xs={10}>
              <Typography variant="large" fontWeight={700}>
                {title}
              </Typography>
            </Grid>
            <Grid item xs={2} alignContent="flex-end">
              <Box display="flex" alignItems="flex-end" flexDirection="column">
                <Typography
                  variant="large"
                  fontWeight={700}
                  color="#367D7F"
                  justifyContent="flex-end"
                  marginBottom={1}
                >
                  {price}
                </Typography>
                <Typography variant="small" fontWeight={400} color="#367D7F">
                  /hr/person
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Tables content={'by ' + expertName} avatar={<Avatar></Avatar>}></Tables>
          <Typography variant="regular" fontWeight={400}>
            {description}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  )
}
export default SessionCard
