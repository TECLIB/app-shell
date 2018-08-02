import withAsyncComponent from 'hoc/withAsyncComponent'

const asyncAdminApp = withAsyncComponent(() => import('../app/AdminApp'))
export default asyncAdminApp
