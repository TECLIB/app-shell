import withAsyncComponent from 'hoc/withAsyncComponent'

const asyncPasswordFieldset = withAsyncComponent(() => import('containers/SignIn/components/PasswordFieldset.js'))
export default asyncPasswordFieldset
