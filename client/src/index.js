import ReactDOM from 'react-dom/client'
import { ToastContainer, Flip } from 'react-toastify'

import { AppProvider } from './hooks'
import Routes from './routes/routes'
import GlobalStyles from './styles/globalStyles'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <AppProvider>
      <Routes />
    </AppProvider>
    <ToastContainer
      autoClose={2000}
      theme="colored"
      transition={Flip}
      pauseOnHover={false}
    />
    <GlobalStyles />
  </>
)
