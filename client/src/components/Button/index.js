import PropTypes from 'prop-types'

import { Button as ButtonApp } from './styles'

export const Button = ({ children, ...rest }) => {
  return <ButtonApp {...rest}>{children}</ButtonApp>
}

Button.propTypes = {
  children: PropTypes.string
}
