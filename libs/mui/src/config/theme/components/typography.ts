import { Components, Theme } from '@mui/material'

export default function overrideTypography(theme: Theme): Components['MuiTypography'] {
  return {
    variants: [
      {
        props: { variant: 'title1' },
        style: { fontSize: '48pt', lineHeight: '56pt' },
      },
      {
        props: { variant: 'title2' },
        style: { fontSize: '32pt', lineHeight: '36pt' },
      },
      {
        props: { variant: 'title3' },
        style: { fontSize: '24pt', lineHeight: '32pt' },
      },
      {
        props: { variant: 'large' },
        style: { fontSize: '18pt', lineHeight: '18pt' },
      },
      {
        props: { variant: 'regular' },
        style: { fontSize: '16pt', lineHeight: '16pt' },
      },
      {
        props: { variant: 'small' },
        style: { fontSize: '14pt', lineHeight: '14pt' },
      },
      {
        props: { variant: 'tiny' },
        style: { fontSize: '12pt', lineHeight: '12pt' },
      },
    ],
  }
}
