import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'

import Cart from '../../assets/cart.svg'
import Person from '../../assets/person.svg'
import paths from '../../constants/paths'
import { useUser } from '../../hooks/UserContext'
import { Container, Links, Line, Informations } from './styles'

export const Header = ({ page }) => {
  const { push } = useHistory()
  const { logoutUser, userData } = useUser()

  return (
    <Container>
      <Links>
        <Link style={{ color: page === 'home' && '#9758A6' }} to={paths.Home}>
          Home
        </Link>
        <Link
          style={{ color: page === 'products' && '#9758A6' }}
          to="/produtos"
        >
          Ver Produtos
        </Link>
      </Links>
      <Informations>
        <img
          onClick={() => push('/carrinho')}
          style={{ marginRight: '40px', cursor: 'pointer' }}
          src={Cart}
          alt="Carrinho"
        />
        <Line></Line>
        <img style={{ marginRight: '15px' }} src={Person} alt="Pessoa" />
        <div>
          <p>Olá, {userData.name}</p>
          <Link to={paths.Home} className="logout" onClick={logoutUser}>
            Sair
          </Link>
        </div>
      </Informations>
    </Container>
  )
}

Header.propTypes = {
  page: PropTypes.string
}
