import { Components, Theme } from '@mui/material'

export function overrideTypography(theme: Theme): Components['MuiTypography'] {
  return {
    variants: [
      {
        props: { variant: 'title1' },
        style: { fontSize: '48pt', lineHeight: '56pt', fontFamily: 'Inter' },
      },
      {
        props: { variant: 'title2' },
        style: { fontSize: '32pt', lineHeight: '36pt', fontFamily: 'Inter' },
      },
      {
        props: { variant: 'title3' },
        style: { fontSize: '24pt', lineHeight: '32pt', fontFamily: 'Inter' },
      },
      {
        props: { variant: 'large' },
        style: { fontSize: '18pt', lineHeight: '18pt', fontFamily: 'Inter' },
      },
      {
        props: { variant: 'regular' },
        style: { fontSize: '16pt', lineHeight: '16pt', fontFamily: 'Inter' },
      },
      {
        props: { variant: 'small' },
        style: { fontSize: '14pt', lineHeight: '14pt', fontFamily: 'Inter' },
      },
      {
        props: { variant: 'tiny' },
        style: { fontSize: '12pt', lineHeight: '12pt', fontFamily: 'Inter' },
      },
    ],
  }
}
