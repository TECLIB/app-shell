/**
 * Actions Pattern for Form SignIn Data Flow
 *
 */

export const changeInput = (ctx, input) => {
  ctx.setState({
    [input.name]: input.value,
  })
}

export const changePhase = (ctx, newPhase) => {
  ctx.setState({
    phase: newPhase,
  })
}

export const handleFormSubmit = (ctx, event) => {
  event.preventDefault()

  ctx.setState({
    isLoading: true,
  }, () => {
    ctx.props.auth.fetchSignIn(ctx.state.username, ctx.state.password)
      .then(() => {
        ctx.props.toast.setNotification({
          title: 'Teclib',
          body: 'Welcome!',
          type: 'success',
        })
      })
      .catch(() => {
        ctx.setState({
          isLoading: false,
          password: '',
        }, () => {
          ctx.props.toast.setNotification({
            title: 'Teclib',
            body: 'Error!',
            type: 'alert',
          })
        })
      })
  })
}
