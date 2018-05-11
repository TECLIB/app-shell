import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import history from './shared/history'
import RootApp from './app/RootApp'
import { AuthenticationProvider } from './providers/AuthenticationProvider'
import { NotificationsProvider } from './providers/NotificationsProvider'
import { I18nProvider } from './providers/I18nProvider'
import registerServiceWorker from './registerServiceWorker'
import './assets/styles/css/index.css'
import theme from './config/theme.json'
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons'
import { loadTheme, setIconOptions } from 'office-ui-fabric-react/lib/Styling'

loadTheme(theme)

initializeIcons(/* optional base url */)
// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
})

ReactDOM.render(
  (
    <Fabric>
      <I18nProvider>
        <NotificationsProvider>
          <AuthenticationProvider>
            <Router history={history}>
              <RootApp />
            </Router>
          </AuthenticationProvider>
        </NotificationsProvider>
      </I18nProvider>
    </Fabric>
  ),
  document.getElementById('root'),
)

registerServiceWorker();
