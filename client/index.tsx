import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="tohora-2023-joon.au.auth0.com"
      clientId="cxRrUeWMYe8WrPUlC6QVzLqUw5XdZPeM"
      redirectUri={`${window.location.origin}/dashboard`}
      audience="https://fruits/api"
    >
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </Auth0Provider>
  )
})
