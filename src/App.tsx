import { ThemeProvider } from '@mui/material/styles'
import { defaultTheme } from './styles/themes/default'
import { Header } from './components/Header'
import { Sales } from './pages/Sales'
import { Provider } from 'react-redux'
import { store } from './redux/store'

import './styles/global.css'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Provider store={store}>
        <Header />
        <Sales />
      </Provider>
    </ThemeProvider>
  )
}
