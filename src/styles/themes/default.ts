import { createTheme } from '@mui/material'

export const defaultTheme = createTheme(({
  palette: {
    primary: {
      main: '#0076C6',
      light: '#3391D1',
      dark: '#00528A'
    },
    secondary: {
      main: '#E98F0A',
      light: '#EDA53B',
      dark: '#A36407',
    },
    neutral: {
      main: '#545454',
      light: '#767676',
      dark: '#3A3A3A',
      contrastText: '#FFF'
    }
  }
}))