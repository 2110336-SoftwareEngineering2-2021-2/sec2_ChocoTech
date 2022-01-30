import {
  CustomPaletteColor,
  CustomPaletteOptions,
  CustomPallete,
  CustomSimplePaletteColorOptions,
} from '@types/mui'

/* eslint-disable */
declare module '@mui/material/styles' {
  interface PaletteOptions extends CustomPaletteOptions {}
  interface SimplePaletteColorOptions extends CustomSimplePaletteColorOptions {}
  interface PaletteColor extends CustomPaletteColor {}
  interface Pallete extends CustomPallete {}
}
