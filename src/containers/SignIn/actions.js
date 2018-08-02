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

  const user = {
    id: 1,
    name: 'User App',
    email: 'user@teclib.com',
    picture: null,
  }

  ctx.props.auth.setCurrentUser(user, 'token')
  ctx.props.toast.setNotification({
    title: 'Teclib',
    body: 'Welcome!',
    type: 'success',
  })
}
