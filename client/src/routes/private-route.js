import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component, isAdmin, ...rest }) {
  const user = localStorage.getItem('codeburger:userData')

  if (isAdmin && !JSON.parse(user).admin) {
    return <Redirect to="/" />
  }

  if (!user) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} component={component} />
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  isAdmin: PropTypes.bool
}

export default PrivateRoute
