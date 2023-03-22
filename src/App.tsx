import { ThemeProvider } from '@mui/material/styles'
import { defaultTheme } from './styles/themes/default'

import { Header } from './components/Header'
import { Sales } from './pages/Sales'

import './styles/global.css'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
      <Sales />
    </ThemeProvider>
  )
}
