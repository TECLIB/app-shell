import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import history from './shared/history'
import RootApp from './app/RootApp'
import { AuthenticationProvider } from './providers/AuthenticationProvider'
import { NotificationsProvider } from './providers/NotificationsProvider'
import { I18nProvider } from './providers/I18nProvider'
import { Provider } from 'react-redux'
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux'
import thunk from 'redux-thunk'
import './assets/styles/css/index.css'
import rootReducer from './store'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    (
        <Provider store={
            createStore(rootReducer, (
                (DevTool) => { // Enable Redux DevTool if are available
                    return (process.env.NODE_ENV === 'development' && typeof (DevTool) === 'function')
                        ? DevTool
                        : compose
                })(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)(
                    applyMiddleware(thunk)
                ))
        }>  
            <I18nProvider>
            <NotificationsProvider>
            <AuthenticationProvider>
                <Router history={history}>
                    <RootApp />
                </Router>
            </AuthenticationProvider>
            </NotificationsProvider>
            </I18nProvider>
        </Provider>
    ),
    document.getElementById('root')
)

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
