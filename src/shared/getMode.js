export default () => (
  window.innerWidth >= 1024 ? 'large' :
    window.innerWidth >= 772 ? 'medium' :
      'small'
)
