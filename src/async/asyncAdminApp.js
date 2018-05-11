import withAsyncComponent from '../hoc/withAsyncComponent';

const asyncAdminApp = withAsyncComponent(() => {
  return import('../app/AdminApp');
});

export default asyncAdminApp;
