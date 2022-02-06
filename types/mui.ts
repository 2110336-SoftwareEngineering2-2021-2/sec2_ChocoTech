import { PaletteColorOptions } from '@mui/material'

export interface CustomPaletteOptions {
  ink: PaletteColorOptions
  sky: PaletteColorOptions
  green: PaletteColorOptions
  red: PaletteColorOptions
  blue: PaletteColorOptions
  yellow: PaletteColorOptions
  white: string
}
export interface CustomSimplePaletteColorOptions {
  lightest?: string
  lighter?: string
  light?: string
  main: string
  dark?: string
  darker?: string
  darkest?: string
  contrastText?: string
}
export interface CustomPaletteColor {
  lightest?: string
  lighter?: string
  light: string
  main: string
  dark: string
  darker?: string
  darkest?: string
  contrastText: string
}
export interface CustomPalette {
  ink: CustomSimplePaletteColorOptions
  sky: CustomSimplePaletteColorOptions
  green: CustomSimplePaletteColorOptions
  red: CustomSimplePaletteColorOptions
  blue: CustomSimplePaletteColorOptions
  yellow: CustomSimplePaletteColorOptions
}

export interface CustomTypographyPropsVariantOverrides {
  title1: true
  title2: true
  title3: true
  large: true
  regular: true
  small: true
  tiny: true
}
