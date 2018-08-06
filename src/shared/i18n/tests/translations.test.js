import I18n from '..'

describe('Check if translations are available', () => {
  it('login page should have english translations', () => {
    expect(I18n.t('login.title')).toBe('Sign in')
    expect(I18n.t('login.username_not_registered')).toBe('The username entered is not registered. Try a different account or')
    expect(I18n.t('login.use_your_account')).toBe('Use your Teclib account')
    expect(I18n.t('login.what_is_this')).toBe('What\'s this?')
    expect(I18n.t('login.no_account')).toBe('No account?')
    expect(I18n.t('login.create_one')).toBe('Create one!')
    expect(I18n.t('login.enter_password')).toBe('Enter password')
    expect(I18n.t('login.enter_password_for')).toBe('Enter the password for')
    expect(I18n.t('login.forgot_my_password')).toBe('Forgot my password')
  })
})
