import { Components, Theme, alpha } from '@mui/material'

export function overrideTypography(theme: Theme): Components['MuiTypography'] {
  return {
    defaultProps: {
      color: theme.palette.ink.darkest,
    },
    variants: [
      {
        props: { variant: 'title1' },
        style: { fontSize: '48px', lineHeight: '56px', fontFamily: 'Inter', fontWeight: 700 },
      },
      {
        props: { variant: 'title2' },
        style: { fontSize: '32px', lineHeight: '36px', fontFamily: 'Inter', fontWeight: 700 },
      },
      {
        props: { variant: 'title3' },
        style: { fontSize: '24px', lineHeight: '28px', fontFamily: 'Inter', fontWeight: 700 },
      },
      {
        props: { variant: 'large' },
        style: { fontSize: '18px', lineHeight: '18px', fontFamily: 'Inter' },
      },
      {
        props: { variant: 'regular' },
        style: { fontSize: '16px', lineHeight: '16px', fontFamily: 'Inter' },
      },
      {
        props: { variant: 'small' },
        style: { fontSize: '14px', lineHeight: '16px', fontFamily: 'Inter' },
      },
      {
        props: { variant: 'tiny' },
        style: { fontSize: '12px', lineHeight: '12px', fontFamily: 'Inter' },
      },
    ],
  }
}

export function overrideLink(theme: Theme): Components['MuiLink'] {
  return {
    styleOverrides: {
      root: {
        textDecoration: `underline 0.15em ${alpha(theme.palette.ink.main, 0)}`,
        color: theme.palette.ink.main,
        transition: theme.transitions.create(['text-decoration-color', 'color']),
        '&:hover': {
          color: theme.palette.primary.main,
          textDecoration: `underline 0.15em ${alpha(theme.palette.primary.main, 1)}`,
        },
      },
    },
  }
}
