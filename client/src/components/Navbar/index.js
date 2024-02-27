import PropTypes from 'prop-types'
import { FaShoppingCart } from 'react-icons/fa'

import logo from '../../assets/logo.svg'
import { Container, Informations, InformationsText } from './styles'

export const Navbar = ({ children }) => {
  return (
    <Container>
      <img src={logo} />
      <div>{children}</div>
      <Informations>
        <InformationsText link="true">Sair</InformationsText>
        <InformationsText>|</InformationsText>
        <FaShoppingCart style={{ fontSize: '25px' }} />
      </Informations>
    </Container>
  )
}

Navbar.propTypes = {
  children: PropTypes.node
}
