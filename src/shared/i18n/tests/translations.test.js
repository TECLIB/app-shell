import Polyglot from 'node-polyglot'
import sourceFile from '../source_file.json'
import { LANGUAGE_DEFAULT } from './constants'

describe('Check if translations are available', () => {
  const polyglot = new Polyglot({
    locale: LANGUAGE_DEFAULT,
    phrases: sourceFile,
  })
  const i18n = {
    t: polyglot.t.bind(polyglot),
  }

  it('login page should have english translations', () => {
    expect(i18n.t('login.title')).toBe('Sign in')
    expect(i18n.t('login.username_not_registered')).toBe('The username entered is not registered. Try a different account or')
    expect(i18n.t('login.create_an_new')).toBe('create an new')
    expect(i18n.t('login.use_your_account')).toBe('Use your Teclib account')
    expect(i18n.t('login.what_is_this')).toBe('What\'s this?')
    expect(i18n.t('login.no_account')).toBe('No account?')
    expect(i18n.t('login.create_one')).toBe('Create one!')
    expect(i18n.t('login.enter_password')).toBe('Enter password')
    expect(i18n.t('login.enter_password_for')).toBe('Enter the password for')
    expect(i18n.t('login.forgot_my_password')).toBe('Forgot my password')
  })
})
