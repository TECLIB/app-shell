import React, { Component } from 'react'

const I18nContext = React.createContext()

class I18nProvider extends Component {
    state = {
        languageDefault: 'en_GB',
        languageCurrent: 'en_GB',
    }
    render() {
        return (
            <I18nProvider.Provider value={{ state: this.state }}>
                {this.props.children}
            </I18nProvider.Provider>
        );
    }
}
