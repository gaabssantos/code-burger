import PropTypes from 'prop-types'

import img from '../../assets/login-image.svg'
import { Container, ContainerImage, Image, ContainerForm } from './styles'

export const BurgerLogo = ({ children }) => {
  return (
    <Container>
      <ContainerImage>
        <Image src={img} alt="Code Burger" />
      </ContainerImage>
      <ContainerForm>{children}</ContainerForm>
    </Container>
  )
}

BurgerLogo.propTypes = {
  children: PropTypes.node
}
