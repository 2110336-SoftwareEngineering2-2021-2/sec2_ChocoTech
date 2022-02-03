import {
  CustomPaletteColor,
  CustomPaletteOptions,
  CustomPallete,
  CustomSimplePaletteColorOptions,
  CustomTypographyPropsVariantOverrides,
} from '@types/mui'

/* eslint-disable */
declare module '@mui/material/styles' {
  interface PaletteOptions extends CustomPaletteOptions {}
  interface SimplePaletteColorOptions extends CustomSimplePaletteColorOptions {}
  interface PaletteColor extends CustomPaletteColor {}
  interface Pallete extends CustomPallete {}
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides extends CustomTypographyPropsVariantOverrides {}
}
