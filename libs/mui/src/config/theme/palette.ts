import { Palette, PaletteColorOptions, PaletteOptions } from '@mui/material'
import createPalette from '@mui/material/styles/createPalette'

declare module '@mui/material/styles' {
  interface PaletteOptions {
    ink: PaletteColorOptions
    sky: PaletteColorOptions
    green: PaletteColorOptions
    red: PaletteColorOptions
    blue: PaletteColorOptions
    yellow: PaletteColorOptions
    white: string
  }
  interface SimplePaletteColorOptions {
    lightest?: string
    lighter?: string
    light?: string
    main: string
    dark?: string
    darker?: string
    darkest?: string
    contrastText?: string
  }
  interface PaletteColor {
    lightest?: string
    lighter?: string
    light: string
    main: string
    dark: string
    darker?: string
    darkest?: string
    contrastText: string
  }
  interface Pallete {
    ink: PaletteColorOptions
    sky: PaletteColorOptions
    green: PaletteColorOptions
    red: PaletteColorOptions
    blue: PaletteColorOptions
    yellow: PaletteColorOptions
  }
}

const paletteOptions: PaletteOptions = {
  white: '#FFFFFF',
  primary: {
    lightest: '#DFF6F7',
    lighter: '#A1DADB',
    light: '#69B7B9',
    main: '#4CA1A3',
    dark: '#367D7F',
  },
  ink: {
    lighter: '#72777A',
    light: '#6C7072',
    main: '#404446',
    dark: '#303437',
    darker: '#202325',
    darkest: '#090A0A',
  },
  sky: {
    lightest: '#F7F9FA',
    lighter: '#F2F4F5',
    light: '#E3E5E5',
    main: '#CDCFD0',
    dark: '#979C9E',
  },
  green: {
    lightest: '#ECFCE5',
    lighter: '#7DDE86',
    light: '#4CD471',
    main: '#23C16B',
    dark: '#198155',
  },
  red: {
    lightest: '#FFE5E5',
    lighter: '#FF9898',
    light: '#FF6D6D',
    main: '#FF5247',
    dark: '#D3180C',
  },
  blue: {
    lightest: '#C9F0FF',
    lighter: '#9BDCFD',
    light: '#6EC2FB',
    main: '#48A7F8',
    dark: '#0065D0',
  },
  yellow: {
    lightest: '#FFEFD7',
    lighter: '#FFD188',
    light: '#FFC462',
    main: '#FFB323',
    dark: '#A05E03',
  },
}

export default paletteOptions
