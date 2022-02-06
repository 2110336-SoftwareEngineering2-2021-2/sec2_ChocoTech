import {
  CustomPalette,
  CustomPaletteColor,
  CustomPaletteOptions,
  CustomSimplePaletteColorOptions,
  CustomTypographyPropsVariantOverrides,
} from '@types/mui'

/* eslint-disable */
declare module '@mui/material/styles' {
  interface PaletteOptions extends CustomPaletteOptions {}
  interface SimplePaletteColorOptions extends CustomSimplePaletteColorOptions {}
  interface PaletteColor extends CustomPaletteColor {}
  interface Palette extends CustomPalette {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides extends CustomTypographyPropsVariantOverrides {}
}
