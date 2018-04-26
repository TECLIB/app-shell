import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import history from './shared/history'
import RootApp from './app/RootApp'
import { AuthenticationProvider } from './providers/AuthenticationProvider'
import { NotificationsProvider } from './providers/NotificationsProvider'
import { I18nProvider } from './providers/I18nProvider'
import './assets/styles/css/index.css'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    (
        <I18nProvider>
            <NotificationsProvider>
                <AuthenticationProvider>
                    <Router history={history}>
                        <RootApp />
                    </Router>
                </AuthenticationProvider>
            </NotificationsProvider>
        </I18nProvider>
    ),
    document.getElementById('root')
)

registerServiceWorker();
