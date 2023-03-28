/* eslint-disable no-undef */
import '@mui/material/styles/createPalette'
declare module '@mui/material/styles/createPalette' {
  interface Palette {
    neutral?: PaletteColor
  }
  interface PaletteOptions {
    neutral?: PaletteColorOptions
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true
  }
}
